// Core
import { Request, Response } from 'express';

const version = (_: Request, res: Response): void => {
  res.status(200).json({ version: process.env.REACT_APP_VERSION || '0.0.1' });
};

export default version;
