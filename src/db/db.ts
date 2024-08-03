import knex from 'knex';
import knexfile from './knexfile';
import { NODE_ENV } from '../config';

// Define a custom logger that doesn't do anything
const customLogger = {
  debug: () => {},
  //   info: () => {},
  //   warn: () => {},
  //   error: () => {},
};

const knexfile_obj: any = knexfile(NODE_ENV || 'development');
knexfile_obj.log = customLogger;
const db = knex(knexfile_obj);

export default db;
