import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { diskStorage } from 'multer';
import { CategoryService } from "./category.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { extname } from 'path';
import { Category } from "./schemas/category.schema";

// Helper function to generate unique filenames
const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getByName(@Query('name') name: string, @Body() body) {
    return await this.categoryService.getByName(name);
  }

  @Get()
  async getAll(@Body() body) {
    return await this.categoryService.getAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName,
    })
  }))
  async create(@Body() categoryData, @Req() req: Request, @UploadedFile() file) {
    return await this.categoryService.create({ ...categoryData, imageSrc: editFileName });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName,
    })
  }))
  async update(@Param('id') id: string, @Body() categoryData: Partial<Category>, @UploadedFile() file) {
    const updateData:any = { name: categoryData.name };
    if (file) {
      updateData.imageSrc = editFileName;
    }
    return await this.categoryService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(id);
    return { message: 'Category has been deleted' };
  }
}
