import { NextFunction, Request, Response, Router } from "express";
import validationMiddleware from "../middlewares/validation.middleware";
import { DefaultResponse } from "../custom-types/response/default.type";
import chatService from "../services/chat.service";
import { HttpException } from "../exceptions/HttpException";
import { SaveMessageRequest } from "../custom-types/request/conversation.type";

const router = Router();
router.use(validationMiddleware);

router.post(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user1Id, user2Id } = req.body;

      console.log(user1Id);

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

router.get(
  "/conversation/:chatId/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatId = req.params.chatId;
      const userId = req.params.userId;

      if (!userId) throw new HttpException(400, "missing parameter 'userId'");
      if (!chatId) throw new HttpException(400, "missing parameter 'chatId'");

      const conversation = await chatService.getConversationByChatId(
        userId,
        chatId
      );

      res.status(200).json({
        isSuccess: true,
        message: "Conversation retrieved successfully",
        data: conversation,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/send-message",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: SaveMessageRequest = req.body;

      if (!request.sender_id)
        throw new HttpException(400, "missing parameter 'senderId'");
      if (!request.chat_id)
        throw new HttpException(400, "missing parameter 'chatId'");
      if (!request.content.trim())
        throw new HttpException(400, "missing parameter 'content'");

      const conversation = await chatService.saveMessage(
        request.sender_id,
        request.chat_id,
        request.content
      );

      res.status(200).json({
        isSuccess: true,
        message: "Conversation retrieved successfully",
        data: conversation,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
