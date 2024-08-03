import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
export const CORS_CREDENTIALS = process.env.CORS_CREDENTIALS === 'true';

export const {
  NODE_ENV,
  PORT,
  DB_NAME,
  DB_USER,
  DB_HOST,
  DB_DRIVER,
  DB_PASSWORD,
  DB_PORT,  
  CORS_ORIGIN
} = process.env;