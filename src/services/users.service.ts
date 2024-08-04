import { User } from "../custom-types/response/user.type";
import usersDao from "../dao/users.dao";


async function getUsers(): Promise<User[]> {
    
    const users : User[] = await usersDao.getUsers();
    for (var i = 0; i < users.length; i++) {
    
    }
    return users;
  }

export default {
  getUsers,
};
