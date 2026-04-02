import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookDto, userId: number) {
    return this.prisma.book.create({
      data: {
        kos_id: dto.kos_id,
        user_id: userId,
        start_date: new Date(dto.start_date),
        end_date: new Date(dto.end_date),
        status: 'PENDING',
      },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.book.findMany({
      where: {
        user_id: userId,
      },
      include: {
        kos: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findAll() {
    return this.prisma.book.findMany({
      include: {
        user: true,
        kos: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: {
        user: true,
        kos: true,
      },
    });

    if (!book) {
      throw new NotFoundException('Booking tidak ditemukan');
    }

    return book;
  }

  async updateStatus(id: number, status: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Booking tidak ditemukan');
    }

    return this.prisma.book.update({
      where: { id },
      data: { status },
    });
  }
}
