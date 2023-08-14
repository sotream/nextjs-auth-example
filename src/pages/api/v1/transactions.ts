// Core
import { Request, Response } from 'express';

// Other
import { createLogger } from '../../../helpers/logger';

// DB
import db from '../../../../database/models';
import { ApiError } from '../../../common/errors';

const log = createLogger('signup');

const usersHandler = async (req: Request, res: Response): Promise<void> => {
  switch (req.method) {
    case 'GET': {
      try {
        // @ts-ignore
        const transactions: any[] = await db.Transaction.findAll({ raw: true });

        log.debug('transactions', transactions);

        res.status(200).json({ message: 'ok' });
      } catch(err) {
        log.error(err);

        const error = err as ApiError;

        res.status(error.statusCode || 400).json({
          error: {
            code:    error.code || 5000,
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

export default usersHandler;
