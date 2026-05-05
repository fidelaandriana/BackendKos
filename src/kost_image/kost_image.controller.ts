import {Controller, Post, Body, Get, Param, Delete,UseGuards, 
        ParseIntPipe, UseInterceptors, UploadedFile
       } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { KostImageService } from './kost_image.service';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { CreateKostImageDto } from './dto/create-kost_image.dto';

@Controller('kos-image')
export class KostImageController {
  constructor(private kosImageService: KostImageService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateKostImageDto
  ) {
    return this.kosImageService.create(dto, file);
  }

  @Get('kos/:kosId')
  findByKos(@Param('kosId', ParseIntPipe) kosId: number) {
    return this.kosImageService.findByKos(kosId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.kosImageService.remove(id);
  }
}