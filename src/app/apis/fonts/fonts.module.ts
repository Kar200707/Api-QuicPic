import { Module } from '@nestjs/common';
import { FontsService } from './fonts.service';
import { FontsController } from './fonts.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Font, FontSchema } from "./schemas/font.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Font.name, schema: FontSchema },
    ])
  ],
  providers: [FontsService],
  controllers: [FontsController]
})
export class FontsModule {}
