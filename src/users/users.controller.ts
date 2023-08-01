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
  NotFoundException,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import { UserDto } from './dto/user.dto';
import { ProductDto } from 'src/products/dto/product.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(@Res() res: Response): Promise<Response> {
    const users = await this.userService.getAllUsers();
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
  // @Patch('updateProfile')
  // @Patch(':id')
  // async updateMe(
  //   @Param('id') id: string,
  //   @Body() userData: UserDto,
  //   @Res() res: Response,
  // ): Promise<Response> {
  //   try {
  //     console.log('hello');
  //     const user = await this.userService.updateMe(id, userData);
  //     return res.status(200).json({
  //       status: 'sucess',
  //     });
  //   } catch (err) {
  //     throw new NotFoundException(err);
  //   }
  // }

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

  @Patch(':id')
  async addToFavorite(
    @Param('id') id: string,
    @Body() data: ProductDto,
    @Res() res: Response,
  ): Promise<Response> {
    const favorites = await this.userService.addToFavorite(id, data.name);

    return res.status(200).json({
      status: 'success',
      favorites,
    });
  }
}
