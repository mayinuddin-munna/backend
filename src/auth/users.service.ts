import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async createUser(data: {
    username: string;
    password: string;
    displayName: string;
  }) {
    return this.prisma.user.create({ data });
  }
}
