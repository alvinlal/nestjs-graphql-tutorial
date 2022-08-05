// only for migrations

import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/users/entities/User.entity';
import { Owner } from './src/owners/entities/Owner.entity';
import { Pet } from './src/pets/entities/Pet.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  migrations: ['src/database/migrations/*.ts'],
  entities: [User, Owner, Pet],
});
