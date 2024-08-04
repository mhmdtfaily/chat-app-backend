import { User } from "../custom-types/dtos/user.dto.type";
import db from "../db/db";

async function getUsers(): Promise<User[]> {
    return await db('user')
      .select(['user.id', 'user.full_name', 'user.email']);
  }

  export default {
    getUsers,
  };
  