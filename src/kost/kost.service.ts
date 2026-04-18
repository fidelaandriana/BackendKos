import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKostDto } from './dto/create-kost.dto';
import { UpdateKostDto } from './dto/update-kost.dto';

@Injectable()
export class KostService {
  constructor(private prisma: PrismaService) {}

  async findAll(gender?: string) {
    return this.prisma.kos.findMany({
      where: gender
        ? {
            gender: gender,
          }
        : {},
      include: {
        images: true,
        facilities: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const kos = await this.prisma.kos.findUnique({
      where: { id },
      include: {
        images: true,
        facilities: true,
        reviews: true,
      },
    });

    if (!kos) {
      throw new NotFoundException('Kos tidak ditemukan');
    }

    return kos;
  }

  async create(dto: CreateKostDto, userId: number) {
    return this.prisma.kos.create({
      data: {
        name: dto.name,
        address: dto.address,
        price_per_month: dto.price_per_month,
        gender: dto.gender,
        user_id: userId,
      },
    });
  }

  async update(id: number, dto: UpdateKostDto) {
    const kos = await this.prisma.kos.findUnique({
      where: { id },
    });

    if (!kos) {
      throw new NotFoundException('Kos tidak ditemukan');
    }

    return this.prisma.kos.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const kos = await this.prisma.kos.findUnique({
      where: { id },
    });

    if (!kos) {
      throw new NotFoundException('Kos tidak ditemukan');
    }

    return this.prisma.kos.delete({
      where: { id },
    });
  }

  async findByOwner(userId: number) {
    return this.prisma.kos.findMany({
      where: {
        user_id: userId,
      },
      include: {
        images: true,
        facilities: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}