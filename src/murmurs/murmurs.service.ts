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

  async delete(userId: number, murmurId: number) {
    const murmur = await this.prisma.murmur.findUnique({
      where: { id: murmurId },
    });
    if (!murmur) throw new NotFoundException('Murmur not found');
    if (murmur.userId !== userId)
      throw new ForbiddenException('Not allowed to delete this murmur');

    await this.prisma.murmur.delete({ where: { id: murmurId } });
    return { message: 'Deleted successfully' };
  }
}
