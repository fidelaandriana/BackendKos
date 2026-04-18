import { Test, TestingModule } from '@nestjs/testing';
import { KostController } from './kost.controller';
import { KostService } from './kost.service';

describe('KostController', () => {
  let controller: KostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KostController],
      providers: [KostService],
    }).compile();

    controller = module.get<KostController>(KostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
