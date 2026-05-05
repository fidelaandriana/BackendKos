import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateKostImageDto } from './dto/create-kost_image.dto';

@Injectable()
export class KostImageService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateKostImageDto, file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('File wajib diupload');
    }

    return this.prisma.kosImage.create({
      data: {
        kos_id: Number(dto.kos_id),
        file: file.filename, // nama file hasil upload
      },
    });
  }

  async findByKos(kosId: number) {
    return this.prisma.kosImage.findMany({
      where: {
        kos_id: kosId,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async remove(id: number) {
    const data = await this.prisma.kosImage.findUnique({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException('Gambar tidak ditemukan');
    }

    return this.prisma.kosImage.delete({
      where: { id },
    });
  }
}