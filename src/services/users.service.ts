import { User } from "../custom-types/dtos/user.dto.type";
import { ChatResponse, UserResponse } from "../custom-types/response/user.type";
import usersDao from "../dao/users.dao";
import bcrypt from "bcrypt";

async function getUsers(): Promise<UserResponse[]> {
  const users: User[] = await usersDao.getUsers();
  let usersResponse: UserResponse[] = [];
  for (var i = 0; i < users.length; i++) {
    let user = users[i];

    usersResponse.push({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
    });
  }
  return usersResponse;
}

async function checkOrCreateUser(
  email: string,
  full_name: string,
  password: string
): Promise<void> {
  const user = await usersDao.getUserByEmail(email);

  if (!user) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await usersDao.createUser(email, full_name, hashedPassword);
    await usersDao.updateUserStatus(newUser.id, true);
   
  } else {
    await usersDao.updateUserStatus(user.id, true);
  }
}

 async function getChatsByUserId(user_id: string): Promise<ChatResponse[]> {
  return await usersDao.getChatsByUserId(user_id);
}

export default {
  getUsers,
  checkOrCreateUser,
  getChatsByUserId
};
