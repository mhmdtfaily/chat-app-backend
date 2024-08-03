export default {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'chat_app',
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
