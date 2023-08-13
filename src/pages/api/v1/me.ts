// Core
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Other
import { createLogger } from '../../../helpers/logger';

// DB
import db from '../../../../database/models';
import { ApiError } from '../../../common/errors';
import { ITokenPayload } from '../../../types';

const log = createLogger('me');

const meHandler = async (req: Request, res: Response): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      try {
        if (!process.env.JWT_TOKEN_SECRET) {
          throw new ApiError('jwt secret should be specified', 3001, 500);
        }

        if (!req.body.access_token) {
          throw new ApiError('No valid tokens found', 3002, 401);
        }

        const tokenData = jwt.verify(req.body.access_token, process.env.JWT_TOKEN_SECRET) as ITokenPayload;

        // @ts-ignore
        const user = await db.User.findOne({
          where: {
            email: tokenData.email
          },
          raw: true
        });

        if (!user) {
          throw new ApiError('Wrong credentials', 3003, 401);
        }

        res.status(200).json({ // TODO; move to utility user format function
          firstName: tokenData.firstName,
          lastName:  tokenData.lastName,
          username:  tokenData.username,
          email:     tokenData.email,
        });
      } catch(err) {
        log.error(err);

        const error = err as ApiError;

        res.status(error.statusCode || 400).json({
          error: {
            code:    error.code || 3000,
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

export default meHandler;
