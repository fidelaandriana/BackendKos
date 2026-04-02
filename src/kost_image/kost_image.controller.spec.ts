import { Test, TestingModule } from '@nestjs/testing';
import { KostImageController } from './kost_image.controller';
import { KostImageService } from './kost_image.service';

describe('KostImageController', () => {
  let controller: KostImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KostImageController],
      providers: [KostImageService],
    }).compile();

    controller = module.get<KostImageController>(KostImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
