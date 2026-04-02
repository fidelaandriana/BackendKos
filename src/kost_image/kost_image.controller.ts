import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { KostImageService } from './kost_image.service';
import { CreateKostImageDto } from './dto/create-kost_image.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '@prisma/client';

@Controller('kos-image')
export class KosImageController {
  constructor(private kosImageService: KostImageService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @Post()
  create(@Body() dto: CreateKostImageDto) {
    return this.kosImageService.create(dto);
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