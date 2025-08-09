import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MurmursService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, text: string) {
    if (!userId) {
      throw new Error('User ID is missing');
    }

    return this.prisma.murmur.create({
      data: { text, userId },
    });
  }

  async findAll() {
    return this.prisma.murmur.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        likes: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findTimeline(userId: number) {
    const follows = await this.prisma.follow.findMany({
      where: { followerId: userId },
      select: { followedId: true },
    });

    const followedIds = follows.map((f) => f.followedId);

    return this.prisma.murmur.findMany({
      where: { userId: { in: followedIds } },
      include: {
        user: { select: { id: true, name: true, email: true } },
        likes: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // murmurs.service.ts
  async delete(userId: number, murmurId: number) {
    console.log('UserId from token:', userId);
    const murmur = await this.prisma.murmur.findUnique({
      where: { id: murmurId },
    });

    if (!murmur) {
      throw new NotFoundException('Murmur not found');
    }

    console.log('Murmur owner userId:', murmur.userId);

    // if (murmur.userId !== userId) {
    //   throw new ForbiddenException('Not allowed to delete this murmur');
    // }

    return this.prisma.murmur.delete({ where: { id: murmurId } });
  }
}
