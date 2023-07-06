import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interfaces/product.interface';
import { request } from 'express';
import { APIFeature } from 'src/utils/apiFeature';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getAllProducts(queryString?: typeof request.query): Promise<Product[]> {
    try {
      const features = new APIFeature(
        this.productModel.find().cache(),
        queryString,
      )
        .filter()
        .sort()
        .limitFields();
      const products = await features.query;
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  async createNewProduct(product: Product): Promise<Product> {
    const newProduct = await this.productModel.create(product);
    return newProduct;
  }

  async getProduct(id: string): Promise<Product> {
    const products = await this.productModel.findById(id).cache();
    return products;
  }

  async updateProduct(id: string, product: Product): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      runValidators: true,
      new: true,
    });
  }

  async deleteProduct(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
