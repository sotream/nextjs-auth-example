// Core
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Other
import { createLogger } from '../../../helpers/logger';

// DB
import db from '../../../../database/models';

const log = createLogger('me');

interface ITokenPayload {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
}

const meHandler = async (req: Request, res: Response): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      try {
        if (!process.env.JWT_TOKEN_SECRET) {
          throw new Error('jwt secret should be specified');
        }

        if (!req.body.access_token) {
          throw new Error('No valid tokens found');
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
          throw new Error('Wrong credentials');
        }

        res.status(200).json({
          firstName: tokenData.firstName,
          lastName:  tokenData.lastName,
          username:  tokenData.username,
          email:     tokenData.email,
        });
      } catch(err) {
        log.error(err);

        const error = err as Error;

        res.status(400).json({
          error: {
            code:    3000,
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
