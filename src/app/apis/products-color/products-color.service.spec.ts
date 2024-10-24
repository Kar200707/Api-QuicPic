import { Test, TestingModule } from '@nestjs/testing';
import { ProductsColorService } from './products-color.service';

describe('ProductsColorService', () => {
  let service: ProductsColorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsColorService],
    }).compile();

    service = module.get<ProductsColorService>(ProductsColorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
