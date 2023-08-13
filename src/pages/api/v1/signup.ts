// Core
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { setCookie } from 'cookies-next';

// Other
import { createLogger } from '../../../helpers/logger';

// DB
import db from '../../../../database/models';
import { ApiError } from '../../../common/errors';

const log = createLogger('signup');

const signUpHandler = async (req: Request, res: Response): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      try {
        if (!process.env.JWT_TOKEN_SECRET) {
          throw new ApiError('jwt secret should be specified', 1001, 500);
        }

        const data = { ...req.body };

        data.password = await bcrypt.hash(data.password, 10);

        // @ts-ignore
        const user = await db.User.create(data);

        delete user.password;

        const tokenPayload = {
          firstName: user.firstName,
          lastName:  user.lastName,
          username:  user.username,
          email:     user.email
        };

        const accessToken = jwt.sign(tokenPayload, process.env.JWT_TOKEN_SECRET);

        setCookie('access_token', accessToken, { req, res, maxAge: 60 * 60 * 8, httpOnly: true });

        res.status(200).json(tokenPayload);
      } catch(err) {
        log.error(err);

        const error = err as ApiError;

        res.status(error.statusCode || 400).json({
          error: {
            code:    error.code || 1000,
            message: error.message || 'Internal error'
          }
        });
      }

      break;
    }
    default: {
      res.status(405).json({
        message: 'Not allowed'
      });
    }
  }
};

export default signUpHandler;
