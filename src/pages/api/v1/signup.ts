// Core
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

// DB
import db from '../../../../database/models';

const signUpHandler = async (req: Request, res: Response): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      try {
        const data = { ...req.body };

        data.password = await bcrypt.hash(data.password, 10);

        // @ts-ignore
        const user = await db.User.create(data);

        delete user.password;

        res.status(200).json(user);
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

export default signUpHandler;
