import { Module } from '@nestjs/common';
import { ProductsColorController } from './products-color.controller';
import { ProductsColorService } from './products-color.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ProductColor, ProductsColorSchema } from "./schemas/products-color.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductColor.name, schema: ProductsColorSchema },
    ])
  ],
  controllers: [ProductsColorController],
  providers: [ProductsColorService]
})
export class ProductsColorModule {}
