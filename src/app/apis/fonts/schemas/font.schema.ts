import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from "../../../auth/schemas/user.schema";

export type FontDocument = Font & Document;

@Schema({ timestamps: true,  collection: 'fonts' })
export class Font {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  value: string;

  @Prop({ ref: User.name })
  user: User;
}

export const FontSchema = SchemaFactory.createForClass(Font);