import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  Req, UseGuards, Query, ParseIntPipe
} from '@nestjs/common';
import { KostService } from './kost.service';
import { CreateKostDto } from './dto/create-kost.dto';
import { UpdateKostDto } from './dto/update-kost.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '@prisma/client';

@Controller('kos')
export class KostController {
  constructor(private kosService: KostService) {}

  // PUBLIC
  @Get()
  findAll(@Query('gender') gender?: string) {
    return this.kosService.findAll(gender);
  }

  // PUBLIC
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.kosService.findOne(id);
  }

  // OWNER ONLY
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @Post()
  create(@Body() dto: CreateKostDto, @Req() req) {
    return this.kosService.create(dto, req.user.sub); // ✅ FIX
  }

  // OWNER ONLY
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateKostDto,
  ) {
    return this.kosService.update(id, dto);
  }

  // OWNER ONLY
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.kosService.remove(id);
  }

  // OWNER ONLY
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.OWNER)
  @Get('owner/me')
  getMyKos(@Req() req) {
    return this.kosService.findByOwner(req.user.sub); // ✅ FIX
  }
}