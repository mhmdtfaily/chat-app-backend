import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  await knex("attachments").del();
  await knex("online_status").del();
  await knex("messages").del();
  await knex("chats").del();
  await knex("users").del();

  const userIds = await knex("users")
    .insert([
      {
        full_name: "Mohammad Toufaily",
        email: "mhmd@gmail.com",
        password: await bcrypt.hash("password1", 10),
      },
      {
        full_name: "Fatima Abdallah",
        email: "fatima@gmail.com",
        password: await bcrypt.hash("password2", 10),
      },
      {
        full_name: "George Nader",
        email: "george@gmail.com",
        password: await bcrypt.hash("password3", 10),
      },
    ])
    .returning("id");

  await knex("online_status").insert([
    {
      user_id: userIds[0].id,
      last_seen: new Date().toISOString(),
      is_online: true,
    },
    {
      user_id: userIds[1].id,
      last_seen: new Date().toISOString(),
      is_online: false,
    },
    {
      user_id: userIds[2].id,
      last_seen: new Date().toISOString(),
      is_online: true,
    },
  ]);
}
