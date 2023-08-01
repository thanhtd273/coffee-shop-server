import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().cache();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userModel.findById(id).cache();
    return user;
  }

  async createUser(user: User): Promise<User> {
    const newUser = await this.userModel.create(user);
    return newUser;
  }

  async updateUser(id: string, user: User): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      runValidators: true,
      new: true,
    });

    return updatedUser;
  }

  async deleteUser(id: string) {
    await this.userModel.findByIdAndDelete(id);
  }

  // private filterObj(obj: object, ...allowedFields: string[]) {
  //   const newObj = {};
  //   Object.keys(obj).forEach((item: string) => {
  //     if (allowedFields.includes(item)) newObj[item] = obj[item];
  //   });
  //   return newObj;
  // }

  // async updateMe(id: string, infor: User): Promise<User> {
  //   const allowanceFields = ['name', 'phone', 'location', 'avatar'];
  //   const filtedBody = this.filterObj(infor, ...allowanceFields);

  //   const updatedUser = await this.userModel.findByIdAndUpdate(id, filtedBody, {
  //     runValidators: true,
  //     new: true,
  //   });

  //   return updatedUser;
  // }

  // async deleteMe(id: string) {
  //   await this.userModel.findByIdAndUpdate();
  // }

  async addToFavorite(id: string, product: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { $push: { favorites: product } },
      { runValidators: true, new: true },
    );
    return user.favorites;
  }
}
