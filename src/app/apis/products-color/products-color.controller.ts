import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ProductsColorService } from "./products-color.service";

@Controller('productcolor')
export class ProductsColorController {
  constructor(private readonly productsColorService: ProductsColorService) {}

  @Get()
  getAll() {
    try {
      return this.productsColorService.getAll();
    } catch (e) {
      throw new HttpException('Filed to get product color', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() productColor) {
    try {
      return await this.productsColorService.createProductColor(productColor);
    } catch (e) {
      throw new HttpException('Filed to create product color', HttpStatus.BAD_REQUEST);
    }
  }
}
