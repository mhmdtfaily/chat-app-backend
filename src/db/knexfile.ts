// Update with your config settings.
import { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } from '../config';

const defaults = {
  client: 'postgresql',
  connection: {
    host: DB_HOST || 'localhost',
    user: DB_USER || 'postgres',
    password: DB_PASSWORD || 'root',
    database: DB_NAME || 'chat_app',
    port: DB_PORT || '5432',
  },
  pool: {
    min: 2,
    max: 10,
    idleTimeoutMillis: 10000, // Increase idle timeout to 10 seconds
    createTimeoutMillis: 30000, // Add create timeout
    acquireTimeoutMillis: 30000, // Add acquire timeout
    propagateCreateError: false, // Prevent propagating errors during connection creation
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

const knex = {
  local: {
    ...defaults,
  },

  development: {
    ...defaults,
    debug: true,
    useNullAsDefault: true,
  },
};

const knexfile = (env: string) => {
  if (env == 'local') return knex['local'];
  if (env == 'development') return knex['development'];
};

export default knexfile;
