import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FollowsService {
  constructor(private prisma: PrismaService) {}

  async followUser(followerId: number, followedId: number) {
    if (followerId === followedId) {
      throw new BadRequestException('You cannot follow yourself');
    }

    return this.prisma.follow.create({
      data: { followerId, followedId },
    });
  }

  async unfollowUser(followerId: number, followedId: number) {
    await this.prisma.follow.deleteMany({
      where: { followerId, followedId },
    });
    return { message: 'Unfollowed successfully' };
  }
}
