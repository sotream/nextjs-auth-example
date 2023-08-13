// Core
import { Request, Response } from 'express';

const version = (req: Request, res: Response): void => {
  switch (req.method) {
    case 'GET': {
      res.status(200).json({ version: process.env.REACT_APP_VERSION || '0.0.1' });

      break;
    }
    default: {
      res.status(405).json({
        message: 'Not allowed'
      });
    }
  }
};

export default version;
