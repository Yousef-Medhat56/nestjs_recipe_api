import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Igredient, Recipe } from 'src/recipe/entity/recipe';
import { User } from 'src/auth/entity/user';
import { initialScheme1708011216111 } from 'src/migrations/1708011216111-initial-scheme';
import { addUser1708011378306 } from 'src/migrations/1708011378306-add-user';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME,
  entities: [Recipe, Igredient, User],
  logging: true,
  migrations: [initialScheme1708011216111, addUser1708011378306],
});
