import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import database from './database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
    }),
  ],
  exports: [ConfigModule],
})
export class ConfigurationModule {}
