import { Test, TestingModule } from '@nestjs/testing';
import { ProductsColorController } from './products-color.controller';

describe('ProductsColorController', () => {
  let controller: ProductsColorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsColorController],
    }).compile();

    controller = module.get<ProductsColorController>(ProductsColorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
