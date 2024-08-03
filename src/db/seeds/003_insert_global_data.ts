import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries in the user table
  await knex('user').del();

  // Inserts seed entries
  await knex('user').insert([
    {
      full_name: 'John Doe',
      email: 'john.doe@example.com',
      password:await bcrypt.hash('password1', 10) ,
    },
    {
      full_name: 'Jane Smith',
      email: 'jane.smith@example.com',
      password:await bcrypt.hash('password2', 10),
    },
    {
      full_name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      password: await bcrypt.hash('password3', 10),
    },
  ]);
}
