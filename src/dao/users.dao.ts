import { User } from "../custom-types/dtos/user.dto.type";
import { ChatResponse } from "../custom-types/response/user.type";
import db from "../db/db";

async function getUsers(): Promise<User[]> {
  return await db("users").select([
    "users.id",
    "users.full_name",
    "users.email",
  ]);
}

async function getUserByEmail(email: string) {
  return await db("users").where({ email }).first();
}

async function createUser(email: string, full_name: string, password: string) {
  const [newUser] = await db("users")
    .insert({
      email,
      full_name,
      password,
    })
    .returning("*");

  return newUser;
}
async function updateUserStatus(user_id: string, is_online: boolean) {
  await db("online_status")
    .insert({
      user_id,
      is_online,
      last_seen: db.fn.now(),
    })
    .onConflict("user_id")
    .merge({
      is_online,
      last_seen: db.fn.now(),
    });
}
async function getChatsByUserId(user_id: string): Promise<ChatResponse[]> {
  const chats = await db("chats")
    .leftJoin("messages", function () {
      this.on("chats.id", "=", "messages.chat_id").andOn(
        "messages.sent_at",
        "=",
        db.raw(`(
        select max(sent_at) 
        from messages 
        where messages.chat_id = chats.id
      )`)
      );
    })
    .leftJoin("users as sender", function () {
      this.on(function () {
        this.on("chats.user1_id", "=", "sender.id").andOn(
          "chats.user2_id",
          "=",
          db.raw("?", [user_id])
        );
      }).orOn(function () {
        this.on("chats.user2_id", "=", "sender.id").andOn(
          "chats.user1_id",
          "=",
          db.raw("?", [user_id])
        );
      });
    })
    .leftJoin("online_status as status", "sender.id", "status.user_id")
    .select(
      "chats.id as chat_id",
      db.raw(
        "case when chats.user1_id = ? then chats.user2_id else chats.user1_id end as sender_id",
        [user_id]
      ),
      "messages.content as last_message",
      "messages.sent_at as date_of_last_message",
      "sender.full_name as sender_name",
      "status.is_online as is_online"
    )
    .where(function () {
      this.where("chats.user1_id", user_id).orWhere("chats.user2_id", user_id);
    })
    .orderBy("messages.sent_at", "desc");

  return chats;
}

export default {
  getUsers,
  getUserByEmail,
  createUser,
  updateUserStatus,
  getChatsByUserId,
};
