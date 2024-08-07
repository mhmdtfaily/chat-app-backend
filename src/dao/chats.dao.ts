import { Chat } from "../custom-types/dtos/chat.dto.type";
import { ConversationResponse } from "../custom-types/response/conversation.type";
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
    const chat = await db("chats")
      .where(function () {
        this.where({ user1_id: user1Id, user2_id: user2Id }).orWhere({
          user1_id: user2Id,
          user2_id: user1Id,
        });
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

async function getConversationByChatId(
  userId: string,
  chatId: string
): Promise<ConversationResponse> {
   // Retrieve the other user's details
   const otherUser = await db('chats')
   .leftJoin('users as u1', 'chats.user1_id', 'u1.id')
   .leftJoin('users as u2', 'chats.user2_id', 'u2.id')
   .leftJoin('online_status as os1', 'u1.id', 'os1.user_id')
   .leftJoin('online_status as os2', 'u2.id', 'os2.user_id')
   .select(
     db.raw('case when chats.user1_id != ? then u1.full_name else u2.full_name end as name', [userId]),
     db.raw('case when chats.user1_id != ? then os1.is_online else os2.is_online end as is_online', [userId]),
     db.raw('case when chats.user1_id != ? then os1.last_seen else os2.last_seen end as last_seen', [userId])
   )
   .where('chats.id', chatId)
   .first();

 // Retrieve the conversation messages
 const messages = await db('messages')
   .select(
     db.raw('case when messages.sender_id = ? then true else false end as is_me', [userId]),
     'messages.content as message',
     'messages.sent_at as date_of_message'
   )
   .where('messages.chat_id', chatId)
   .orderBy('messages.sent_at', 'asc');

 // Format the response
 const conversation: ConversationResponse = {
   name: otherUser.name,
   is_online: otherUser.is_online,
   last_seen: otherUser.last_seen,
   messages: messages.map((msg: any) => ({
     is_me: msg.is_me,
     message: msg.message,
     date_of_message: msg.date_of_message
   }))
 };

 return conversation;
}

export default {
  sendMessage,
  createChat,
  findChat,
  getConversationByChatId,
};
