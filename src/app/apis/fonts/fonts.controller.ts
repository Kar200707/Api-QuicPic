import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { FontsService } from "./fonts.service";

@Controller('font')
export class FontsController {
  constructor(private fontsService: FontsService) {}

  @Get()
  async getAll() {
    try {
      return await this.fontsService.getAllFonts();
    } catch (error) {
      throw new HttpException('Filed to get fonts', HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  async create(@Body() font) {
    try {
      return await this.fontsService.createFont(font);
    } catch (error) {
      throw new HttpException('Filed to create fonts', HttpStatus.BAD_REQUEST);
    }
  }
}
