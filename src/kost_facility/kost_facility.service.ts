import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKostFacilityDto } from './dto/create-kost_facility.dto';
import { UpdateKostFacilityDto } from './dto/update-kost_facility.dto';

@Injectable()
export class KostFacilityService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateKostFacilityDto) {
    return this.prisma.kosFacility.create({
      data: {
        kos_id: dto.kos_id,
        facility: dto.facility,
      },
    });
  }

  async findByKos(kosId: number) {
    return this.prisma.kosFacility.findMany({
      where: {
        kos_id: kosId,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const data = await this.prisma.kosFacility.findUnique({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException('Fasilitas tidak ditemukan');
    }

    return data;
  }

  async update(id: number, dto: UpdateKostFacilityDto) {
    const data = await this.prisma.kosFacility.findUnique({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException('Fasilitas tidak ditemukan');
    }

    return this.prisma.kosFacility.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const data = await this.prisma.kosFacility.findUnique({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException('Fasilitas tidak ditemukan');
    }

    return this.prisma.kosFacility.delete({
      where: { id },
    });
  }
}