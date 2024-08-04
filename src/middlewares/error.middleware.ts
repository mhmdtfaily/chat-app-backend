import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';
import { ErrorResponse } from '../custom-types/response/default.type';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong.';

    const response: ErrorResponse = {
      isSuccess: false,
      message: error.message,
      data: null,
    };
    res.status(status).json(response);
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
