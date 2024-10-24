import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "../../../auth/schemas/user.schema";

export type ProductsColorDocument = ProductColor & Document;

@Schema({ timestamps: true, collection: 'productcolors' })
export class ProductColor {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  hex: string;

  @Prop({ ref: User.name })
  user: User;
}

export const ProductsColorSchema = SchemaFactory.createForClass(ProductColor);
