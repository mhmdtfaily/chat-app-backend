import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { validator } from '../utils/validator';


const validationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors: string[] = validator(`${req.method}-${req.originalUrl}`, req.params, req.body);

    // if there are errors send them to user with 400
    if (errors.length > 0) next(new HttpException(400, errors.toString()));

    next();
  } catch (error) {
    next(new HttpException(400, 'Bad Request'));
  }
};

export default validationMiddleware;
