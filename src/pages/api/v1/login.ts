// Core
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { setCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';

// DB
import db from '../../../../database/models';

const signUpHandler = async (req: Request, res: Response): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      try {
        if (!process.env.JWT_TOKEN_SECRET) {
          throw new Error('jwt secret should be specified');
        }

        // @ts-ignore
        const user = await db.User.findOne({
          where: {
            email: req.body.email
          },
          raw: true
        });

        if (!user) {
          throw new Error('Wrong credentials');
        }

        const compareResult = await bcrypt.compare(req.body.password, user.password);

        if (!compareResult) {
          throw new Error('Wrong credentials');
        }

        const tokenPayload = {
          firstName: user.firstName,
          lastName:  user.lastName,
          username:  user.username,
          email:     user.email
        };

        const accessToken = jwt.sign(tokenPayload, process.env.JWT_TOKEN_SECRET);

        setCookie('access_token', accessToken, { req, res, maxAge: 60 * 6 * 24, httpOnly: true });

        res.status(200).json(tokenPayload);
      } catch(err) {
        const error = err as Error;

        res.status(400).json({
          error: {
            code:    2000,
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
