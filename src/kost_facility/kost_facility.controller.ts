import {Controller, Post, Body, Get, Param, Delete, Patch, UseGuards,ParseIntPipe} from '@nestjs/common';
import { KostFacilityService } from './kost_facility.service';
import { CreateKostFacilityDto } from './dto/create-kost_facility.dto';
import { UpdateKostFacilityDto } from './dto/update-kost_facility.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '@prisma/client';

@Controller('kost-facility')
export class KostFacilityController {
  constructor(private kosFacilityService: KostFacilityService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @Post()
  create(@Body() dto: CreateKostFacilityDto) {
    return this.kosFacilityService.create(dto);
  }

  @Get('kos/:kosId')
  findByKos(@Param('kosId', ParseIntPipe) kosId: number) {
    return this.kosFacilityService.findByKos(kosId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.kosFacilityService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateKostFacilityDto,
  ) {
    return this.kosFacilityService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.kosFacilityService.remove(id);
  }
}