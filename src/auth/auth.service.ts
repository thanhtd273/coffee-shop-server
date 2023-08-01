import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

import { User } from 'src/users/interfaces/user.interface';
import { Credential } from './interfaces/credential.interface';
import { NextFunction } from 'express';
import { Email } from 'src/utils/email';
const { promisify } = require('util');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  private signToken(id: string) {
    return sign({ id }, this.configService.get('JWT_SECRET'), {
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });
  }
  private createAndSendToken(user: Document) {
    const token = this.signToken(user._id.toString());
    return { token, user };
  }

  async signup(data: User) {
    const user = await this.userModel.create(data);
    if (!user) throw new Error('Cannot create new user!');

    return this.createAndSendToken(user);
  }

  async login(credential: Credential) {
    try {
      if (!credential.email || !credential.password)
        throw new Error('Please provide email or password');
      const user = await this.userModel
        .findOne({ email: credential.email })
        .cache()
        .select('+password');
      if (!user)
        throw new Error('Not found account belongs to your credential!');

      if (!(await user.correctPassword(credential.password, user.password)))
        throw new Error('Invalid email or password!');

      return this.createAndSendToken(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

  async protect(token: string, next: NextFunction) {
    try {
      if (!token || token === 'null') {
        throw new UnauthorizedException('You are not logged in!');
      }

      const decoded = await promisify(jwt.verify)(
        token,
        this.configService.get('JWT_SECRET'),
      );
      const freshUser = await this.userModel
        .findById(Object.values(decoded)[0])
        .cache();
      if (!freshUser)
        throw new NotFoundException(
          'The user belongs to this token does no longer exists!',
        );
      return freshUser;
    } catch (error) {
      next(new UnauthorizedException(error));
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user)
      throw new NotFoundException('There is no user with email addresss');

    const resetToken = user.createPasswordResetToken();
    await user.save();

    try {
      // const resetURL = `${req.protocol}://${req.get(
      //   "host"
      // )}/api/v1/users/resetPassword/${resetToken}`;
      await new Email(user).sendPasswordReset(resetToken);
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new BadRequestException(
        'There was an error sending the email. Try again later.',
      );
    }
  }

  async resetPassword(
    token: string,
    password: string,
    passwordConfirm: string,
  ) {
    try {
      const hashedToken = createHash('sha256').update(token).digest('hex');
      const user = await this.userModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });
      if (!user) throw new NotFoundException('Token is invalid or has expired');
      user.password = password;
      user.passwordConfirm = passwordConfirm;
      user.passwordResetExpires = undefined;
      user.passwordResetToken = undefined;

      await user.save();

      return this.createAndSendToken(user);
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Error' },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
}
