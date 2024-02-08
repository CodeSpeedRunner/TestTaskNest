import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database-module';
import { ConfigurationModule } from './configuration/configuration.module';
import { RL } from './entities/rl.entity';
import { RLD } from './entities/rld.entity';
import { AuthModule } from './auth/auth.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Module({
  imports: [
    ConfigurationModule,
    AuthModule,
    DatabaseModule,
    TypeOrmModule.forFeature([RL, RLD]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
