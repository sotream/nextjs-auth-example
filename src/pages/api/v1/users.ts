// Core
import { Request, Response } from 'express';

// DB
import db from '../../../../database/models';

const usersHandler = async (req: Request, res: Response): Promise<void> => {
  switch (req.method) {
    case 'GET': {
      try {
        // @ts-ignore
        const users = await db.User.findAll({ raw: true });

        // TODO; add TypeScript type for users
        users.forEach((user: any) => {
          delete user.password;
        });

        res.status(200).json(users);
      } catch(err) {
        const error = err as Error;

        res.status(400).json({
          error: {
            code:    1000,
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
