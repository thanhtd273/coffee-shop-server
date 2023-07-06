import {
  Body,
  Controller,
  Get,
  Param,
  Res,
  Post,
  Patch,
  Delete,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(@Res() res: Response): Promise<Response> {
    const users = await this.userService.getAllUsers();
    console.log(users);
    return res.status(200).json({
      status: 'success',
      result: users.length,
      users,
    });
  }

  @Get(':id')
  async getUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.userService.getUser(id);

    return res.json({
      status: 'success',
      user,
    });
  }

  @Post()
  async createNewUser(
    @Body() newUser: UserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const user = await this.userService.createUser(newUser);

      return res.json({
        status: 'success',
        user,
      });
    } catch (error) {
      console.log(error.code);
      throw new ForbiddenException(error, 'error message');
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const user = await this.userService.updateUser(id, userData);

      return res.json({
        status: 'success',
        user,
      });
    } catch (error) {
      throw new BadRequestException(error, {
        cause: new Error(),
        description: 'Error message',
      });
    }
  }

  @Delete(':id')
  async deleteUser(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.userService.deleteUser(id);

    return res.json({
      status: 'success',
      user: null,
    });
  }
}
