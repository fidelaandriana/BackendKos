import { Test, TestingModule } from '@nestjs/testing';
import { KostFacilityService } from './kost_facility.service';

describe('KostFacilityService', () => {
  let service: KostFacilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KostFacilityService],
    }).compile();

    service = module.get<KostFacilityService>(KostFacilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
