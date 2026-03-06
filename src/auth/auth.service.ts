import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService) {}

  async register(data: RegisterDto) {
    return this.prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        role: data.role,
      },
    });
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (!user || user.password !== data.password) {
      throw new Error('Username atau password salah');
    }

    return user;
  }
}
}
