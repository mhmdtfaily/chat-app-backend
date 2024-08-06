
import { Chat } from "../custom-types/dtos/chat.dto.type";
import db from "../db/db";


async function sendMessage(chatId: string, senderId: string, content: string) {
  try {
    const [newMessage] = await db("messages")
      .insert({
        chat_id: chatId,
        sender_id: senderId,
        content: content,
      })
      .returning("*");

    return newMessage;
  } catch (error) {
    console.error("Error sending message in DAO:", error);
    throw new Error("Failed to send message");
  }
}

async function findChat(user1Id: string, user2Id: string): Promise<Chat> {
  try {
      // Query to find if a chat exists between user1Id and user2Id
      const chat = await db('chats')
          .where(function() {
              this.where({ user1_id: user1Id, user2_id: user2Id })
                  .orWhere({ user1_id: user2Id, user2_id: user1Id });
          })
          .first(); // Use .first() to get a single result if it exists

      // Return the chat if found, otherwise null
      return chat;
  } catch (error) {
      console.error("Error finding chat:", error);
      throw error;
  }
}

async function createChat(chat: Chat): Promise<Chat> {
  try {
    const [chatCreated] = await db("chats").insert(chat).returning("*");
    return chatCreated;
} catch (error) {
    console.error("Error creating chat:", error);
    throw error;
}
}

export default {
  sendMessage,
  createChat,
  findChat
};
