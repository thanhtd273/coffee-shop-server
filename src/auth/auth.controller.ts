import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserDto } from 'src/users/dto/user.dto';
import { CredentialDto } from './dto/credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: UserDto, @Res() res: Response): Promise<Response> {
    try {
      const user = await this.authService.signup(data);

      return res.json({
        status: 'success',
        token: user.token,
        user: user.user,
      });
    } catch (error) {
      throw new ConflictException(error);
    }
  }

  @Post('login')
  @HttpCode(201)
  async login(
    @Body() credential: CredentialDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.login(credential);
    return res.json({
      status: 'success',
      token: user.token,
      user: user.user,
    });
  }

  @Post('forgotPassword')
  async forgotPassword(
    @Body() credential: CredentialDto,
    @Res() res: Response,
  ) {
    await this.authService.forgotPassword(credential.email);
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  }

  @Post('resetPassword')
  async resetPassword(
    @Body() credential: CredentialDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.resetPassword(
      credential.token,
      credential.password,
      credential.passwordConfirm,
    );

    return res.json({
      status: 'success',
      token: user.token,
      user: user.user,
    });
  }
}
