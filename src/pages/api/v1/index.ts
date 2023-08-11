// Core
import { Request, Response } from 'express';

const index = (_req: Request, res: Response): void => {
  res.status(403).json({
    message: 'Forbidden'
  });
};

export default index;
