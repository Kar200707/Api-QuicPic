import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "./schemas/category.schema";

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) {}

  async getByName(name: string) {
    if (name === '') {
      try {
        return await this.categoryModel.find();
      } catch (error) {
        throw new HttpException('Error to get categories', HttpStatus.BAD_REQUEST);
      }
    } else {
      try {
        return await this.categoryModel.find({ name });
      } catch (error) {
        throw new HttpException('Error to get categories', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async getAll() {
    console.log('asdasd');
    return this.categoryModel.find();
  }

  async create(body) {
    const category = {
      name: body.name,
      user: body.user.id,
      imageSrc: body.file ? body.file.path : ''
    }

    return this.categoryModel.create(category);
  }

  async update(id: string, updateData: Partial<Category>) {
    return this.categoryModel.findOneAndUpdate({ _id: id }, { $set: updateData }, { new: true });
  }

  async remove(id: string) {
    return this.categoryModel.deleteOne({ _id: id });
  }
}
