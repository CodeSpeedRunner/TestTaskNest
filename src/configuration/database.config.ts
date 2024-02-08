import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default registerAs('database', (): TypeOrmModuleOptions => {
  const options: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST_P,
    port: Number(process.env.DB_PORT_P),
    username: process.env.DB_USERNAME_P,
    password: process.env.DB_PASSWORD_P,
    database: process.env.DB_NAME_P,
    entities: ['dist/**/*.entity.js'],
  };

  return options;
});
