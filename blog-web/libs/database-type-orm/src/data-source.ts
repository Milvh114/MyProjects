import { DataSource } from 'typeorm';
import DefaultEntities from './entities';
import DefaultMigrations from './migrations';
require('dotenv').config();

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  timezone: 'Z',
  charset: 'utf8',
  bigNumberStrings: false,
  entities: [...DefaultEntities],
  migrations: [...DefaultMigrations],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});
