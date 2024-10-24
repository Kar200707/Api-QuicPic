import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel, raw } from "@nestjs/mongoose";
import { Product } from "./schemas/products.schema";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private readonly products: Model<Product>) {  }

  async getAll() {
    return this.products.find();
  }

  async createProduct(body) {
    if (body.name && body.value && body.user.id) {
      const products = {
        name: body.name,
        type: body.type,
        user: body.user.id,
      }

      await this.products.create(products);
    } else {
      throw new HttpException('Filed to get fonts', HttpStatus.BAD_REQUEST);
    }
  }
}
