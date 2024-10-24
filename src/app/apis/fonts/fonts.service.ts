import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Font } from "./schemas/font.schema";
import { Model } from "mongoose";

@Injectable()
export class FontsService {
  constructor(@InjectModel(Font.name) private readonly fontsModel: Model<Font>) {  }

  async getAllFonts() {
    return this.fontsModel.find();
  }

  async createFont(body) {
    if (body.name && body.value && body.user.id) {
      const fonts = {
        name: body.name,
        value: body.value,
        user: body.user.id,
      }

      await this.fontsModel.create(fonts);
    } else {
      throw new HttpException('Filed to create fonts', HttpStatus.BAD_REQUEST);
    }
  }
}
