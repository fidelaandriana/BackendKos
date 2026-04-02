import { Test, TestingModule } from '@nestjs/testing';
import { KostFacilityController } from './kost_facility.controller';
import { KostFacilityService } from './kost_facility.service';

describe('KostFacilityController', () => {
  let controller: KostFacilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KostFacilityController],
      providers: [KostFacilityService],
    }).compile();

    controller = module.get<KostFacilityController>(KostFacilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
