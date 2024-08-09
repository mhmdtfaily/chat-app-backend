import { NextFunction, Request, Response, Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { ChatResponse, UserResponse } from "../custom-types/response/user.type";
import userService from "../services/users.service";
import { DefaultResponse } from "../custom-types/response/default.type";
import { HttpException } from "../exceptions/HttpException";

const router = Router();
router.use(validationMiddleware);

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    //validate that the user_id parameter is present
    if (!req.params.id)
      throw new HttpException(400, "missing parameter 'user_id'");

    const my_id: string = req.params.id;
    const data: UserResponse[] = await userService.getUsers(my_id);
    const responseData: DefaultResponse = {
      isSuccess: true,
      message: "Get Users successful",
      data: data,
    };

    res.status(200).json(responseData);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/login-or-create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //validate that the email and fullName parameter is present
      if (!req.body.email || !req.body.fullName)
        throw new HttpException(400, "missing parameter 'email' or 'fullName'");
      const { email, fullName, password } = req.body;
      const data: UserResponse = await userService.checkOrCreateUser(
        email,
        fullName,
        password
      );
      const responseData: DefaultResponse = {
        isSuccess: true,
        message: "User checked and created if necessary",
        data: data,
      };

      res.status(200).json(responseData);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id/chats",
  async (req: Request | any, res: Response, next: NextFunction) => {
    try {
      //validate that the user_id parameter is present
      if (!req.params.id)
        throw new HttpException(400, "missing parameter 'user_id'");
      const user_id: string = req.params.id;

      const data: ChatResponse[] = await userService.getChatsByUserId(user_id);
      const response: DefaultResponse = {
        isSuccess: true,
        message: "Burn token successful",
        data: data,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
