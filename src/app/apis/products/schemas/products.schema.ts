import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "../../../auth/schemas/user.schema";

export type ProductDocument = Product & Document;

@Schema({ collection: 'products' })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  type: string;

  @Prop({ ref: User.name })
  user: User;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
