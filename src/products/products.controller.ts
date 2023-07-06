import {
  Controller,
  Param,
  Res,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getAllProducts(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const products = await this.productService.getAllProducts(req.query);
    return res.json({
      status: 'success',
      result: products.length,
      products,
    });
  }

  @Post()
  async createNewProduct(
    @Body() productDto: ProductDto,
    @Res() res: Response,
  ): Promise<Response> {
    const product = await this.productService.createNewProduct(productDto);
    return res.json({
      status: 'success',
      product,
    });
  }

  @Get(':id')
  async getProduct(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const product = await this.productService.getProduct(id);
    return res.json({
      status: 'success',
      product,
    });
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updatedProduct: ProductDto,
    @Res() res: Response,
  ): Promise<Response> {
    const product = await this.productService.updateProduct(id, updatedProduct);
    return res.json({
      status: 'success',
      product,
    });
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<Response> {
    await this.productService.deleteProduct(id);
    return res.json({
      status: 'success',
      product: null,
    });
  }
}
