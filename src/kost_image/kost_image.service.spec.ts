import { Test, TestingModule } from '@nestjs/testing';
import { KostImageService } from './kost_image.service';

describe('KostImageService', () => {
  let service: KostImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KostImageService],
    }).compile();

    service = module.get<KostImageService>(KostImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
