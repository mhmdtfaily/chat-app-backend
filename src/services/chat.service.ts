import { Chat } from "../custom-types/dtos/chat.dto.type";
import { ConversationResponse } from "../custom-types/response/conversation.type";
import chatDao from "../dao/chats.dao";

async function sendMessage(chatId: string, senderId: string, content: string) {}

async function createChat(user1Id: string, user2Id: string) {
        // Check if a chat already exists between the users
        const existingChat = await chatDao.findChat(user1Id, user2Id);

        if (existingChat) {
            // If chat exists, return the existing chat ID
            return existingChat.id;
        } else {
            // If no chat exists, create a new chat
            const newChat = {
                user1_id: user1Id,
                user2_id: user2Id,
            };
            const createdChat = await chatDao.createChat(newChat);
            return createdChat.id;
        }
    }

    async function getConversationByChatId(userId: string, chatId: string): Promise<ConversationResponse> {
        const conversation = await chatDao.getConversationByChatId(userId, chatId);
        return conversation;
      }

export default {
  createChat,
  getConversationByChatId
};
