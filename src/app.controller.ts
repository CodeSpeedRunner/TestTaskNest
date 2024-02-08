import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RL } from './entities/rl.entity';
import { ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import * as jwt from 'jsonwebtoken';
import { User } from './dto/user-dto';
import { GetLocusQueryDto } from './dto/rl.dto';
// import { RLD } from './entities/rl.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('/locus')
  @ApiQuery({ name: 'sideloading', required: true, type: Boolean })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  async getLocus(
    @Query() query: GetLocusQueryDto,
    @Query('sideloading') sideloading: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 1000,
    @Session() sessionStorage,
  ): Promise<RL[]> {
    if (sessionStorage.access_token) {
      const decoded = jwt.decode(sessionStorage.access_token) as User;
      const convertedSideloading = sideloading === 'true';
      return await this.appService.getLocus(
        query,
        convertedSideloading,
        page,
        limit,
        decoded.role,
      );
    } else {
      throw new UnauthorizedException();
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Session() sessionStorage,
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    const access_token = await this.authService.signIn(username, password);
    sessionStorage.access_token = access_token;
    return access_token;
  }
}
