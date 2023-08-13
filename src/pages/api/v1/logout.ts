// Core
import { Request, Response } from 'express';
import { setCookie } from 'cookies-next';

// Other
import { createLogger } from '../../../helpers/logger';
import { ApiError } from '../../../common/errors';

const log = createLogger('logout');

const signUpHandler = async (req: Request, res: Response): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      try {
        setCookie('access_token', '', { req, res, maxAge: 0, httpOnly: true });

        res.status(200).json({ message: 'ok' });
      } catch(err) {
        log.error(err);

        const error = err as ApiError;

        res.status(error.statusCode || 400).json({
          error: {
            code:    error.code || 4000,
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
