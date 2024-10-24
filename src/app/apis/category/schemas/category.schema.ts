import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "../../../auth/schemas/user.schema";

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, collection: 'categories' })
export class Category {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  imageSrc: string;

  @Prop({ ref: User.name })
  user: User;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
