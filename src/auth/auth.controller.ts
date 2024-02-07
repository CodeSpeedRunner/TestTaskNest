// import { Controller, Post, HttpCode, HttpStatus, Query } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('/auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @HttpCode(HttpStatus.OK)
//   @Post('login')
//   async signIn(
//     @Query('username') username: string,
//     @Query('password') password: string,
//   ) {
//     return await this.authService.signIn(username, password);
//   }
// }
