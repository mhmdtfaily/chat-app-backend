import { User } from "../custom-types/dtos/user.dto.type";
import { ChatResponse, UserResponse } from "../custom-types/response/user.type";
import usersDao from "../dao/users.dao";
import bcrypt from "bcrypt";

async function getUsers(my_id: string): Promise<UserResponse[]> {
  const users: User[] = await usersDao.getUsers();
  let usersResponse: UserResponse[] = [];

  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    if (user.id !== my_id) {
      // Exclude the user with id equal to my_id
      usersResponse.push({
        id: user.id,
        email: user.email,
        full_name: user.full_name,
      });
    }
  }

  return usersResponse;
}

async function checkOrCreateUser(
  email: string,
  full_name: string,
  password: string
): Promise<UserResponse> {
  const user = await usersDao.getUserByEmail(email);

  if (!user) {
    let hashedPassword = "";
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    } else {
      hashedPassword = await bcrypt.hash("p@ssw0rd", 10);
    }
    const newUser = await usersDao.createUser(email, full_name, hashedPassword);
    await usersDao.updateUserStatus(newUser.id, true);
    return newUser;
  } else {
    await usersDao.updateUserStatus(user.id, true);
  }
  return user;
}

async function getChatsByUserId(user_id: string): Promise<ChatResponse[]> {
  return await usersDao.getChatsByUserId(user_id);
}

export default {
  getUsers,
  checkOrCreateUser,
  getChatsByUserId,
};
