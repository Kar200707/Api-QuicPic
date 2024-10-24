import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductColor } from "./schemas/products-color.schema";

;

@Injectable()
export class ProductsColorService {
  constructor(@InjectModel(ProductColor.name) private readonly productsColorModel: Model<ProductColor>) {  }

  async getAll() {
    return this.productsColorModel.find();
  }

  async createProductColor(body) {
    if (body.name && body.value && body.user.id) {
      const fonts = {
        name: body.name,
        hex: body.hex,
        user: body.user.id,
      }

      await this.productsColorModel.create(fonts);
    } else {
      throw new HttpException('Filed to create product color', HttpStatus.BAD_REQUEST);
    }
  }

}
