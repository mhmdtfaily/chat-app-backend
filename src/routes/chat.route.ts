import { NextFunction, Request, Response, Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { UserResponse } from "../custom-types/response/user.type";
import userService from "../services/users.service";
import { DefaultResponse } from "../custom-types/response/default.type";
import chatService from "../services/chat.service";

const router = Router();

// Route to send a message
router.post(
  "/send",
  async (req: Request, res: Response, next: NextFunction) => {
    const { chatId, senderId, content } = req.body;

    if (!chatId || !senderId || !content) {
      return res
        .status(400)
        .json({ error: "chatId, senderId, and content are required" });
    }

    try {
      res.status(201).json();
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user1Id, user2Id } = req.body;

      console.log(user1Id)

      if (!user1Id || !user2Id) {
        return res.status(400).json({ error: "User IDs are required" });
      }

      if (user1Id === user2Id) {
        return res.status(400).json({ error: "Users must be different" });
      }

      const chat = await chatService.createChat(user1Id, user2Id);

      let response: DefaultResponse = {
        isSuccess: true,
        message: "Chat created successfully",
        data: chat,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
