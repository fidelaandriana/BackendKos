import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReviewDto, userId: number) {
    return this.prisma.review.create({
      data: {
        kos_id: dto.kos_id,
        comment: dto.comment,
        user_id: userId,
      },
    });
  }

  async findByKos(kosId: number) {
    return this.prisma.review.findMany({
      where: {
        kos_id: kosId,
      },
      include: {
        user: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review tidak ditemukan');
    }

    return review;
  }

  async update(id: number, dto: UpdateReviewDto) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review tidak ditemukan');
    }

    return this.prisma.review.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Review tidak ditemukan');
    }

    return this.prisma.review.delete({
      where: { id },
    });
  }
}