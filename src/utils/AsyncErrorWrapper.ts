import { NextFunction, Request, Response } from 'express';

const AsyncErrorWrapper = (callback: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export default AsyncErrorWrapper;
