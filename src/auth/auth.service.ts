import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(data: RegisterDto) {

    const userExist = await this.prisma.user.findUnique({
      where: { email: data.email }
    })

    if (userExist) {
      throw new BadRequestException("Email sudah digunakan")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        role: data.role || 'SOCIETY'
      }
    })

    return user
  }

  async login(data: LoginDto) {

    const user = await this.prisma.user.findUnique({
      where: { email: data.email }
    })

    if (!user) {
      throw new BadRequestException("User tidak ditemukan")
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password)

    if (!isPasswordValid) {
      throw new BadRequestException("Password salah")
    }

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role
    })

    return {
      user,
      access_token: token
    }
  }

}