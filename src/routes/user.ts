import { NextFunction, Request, Response, Router } from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import { User } from '../custom-types/response/user.type';
import userService from '../services/users.service';
import { DefaultResponse } from '../custom-types/response/default.type';


const router = Router();
router.use(validationMiddleware);

router.get('', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: User[] = await userService.getUsers();
      const responseData: DefaultResponse = {
        isSuccess: true,
        message: 'Get Users successful',
        data: data,
      };
  
      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  });


export default router;
