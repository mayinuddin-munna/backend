import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async likeMurmur(userId: number, murmurId: number) {
    return this.prisma.like.create({
      data: { userId, murmurId },
    });
  }

  async unlikeMurmur(userId: number, murmurId: number) {
    await this.prisma.like.deleteMany({
      where: { userId, murmurId },
    });
    return { message: 'Unliked successfully' };
  }
}
