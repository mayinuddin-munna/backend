import { Controller, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FollowsService } from './follows.service';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  follow(@Request() req, @Param('id') id: string) {
    return this.followsService.followUser(req.user.userId, Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  unfollow(@Request() req, @Param('id') id: string) {
    return this.followsService.unfollowUser(req.user.userId, Number(id));
  }
}
