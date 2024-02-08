import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.JWT_USER_EXPIRES_IN },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
