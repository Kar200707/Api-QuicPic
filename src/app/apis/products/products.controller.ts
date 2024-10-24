import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";

@Controller('product')
export class ProductsController {
  constructor(private productsService: ProductsService) { }

  @Get()
  async getAll() {
    try {
      return await this.productsService.getAll();
    } catch (error) {
      throw new HttpException('Filed to get products', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() product) {
    try {
      return this.productsService.createProduct(product);
    } catch (error) {
      throw new HttpException('Filed to create products', HttpStatus.BAD_REQUEST);
    }
  }
}
