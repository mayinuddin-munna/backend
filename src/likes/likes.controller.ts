import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('murmurs')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  like(@Request() req, @Param('id') id: string) {
    return this.likesService.likeMurmur(req.user.userId, Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/like')
  unlike(@Request() req, @Param('id') id: string) {
    return this.likesService.unlikeMurmur(req.user.userId, Number(id));
  }
}
