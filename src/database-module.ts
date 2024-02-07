import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const result = configService.get<TypeOrmModuleOptions>('database');
        if (!result) {
          throw new Error('Provide Database options.');
        }

        return result;
      },
    }),
  ],
})
export class DatabaseModule {}
