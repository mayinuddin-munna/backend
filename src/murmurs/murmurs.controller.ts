import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('murmurs')
export class MurmursController {
  constructor(private readonly murmursService: MurmursService) {}

  @Get()
  findAll() {
    return this.murmursService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('timeline')
  findTimeline(@Request() req) {
    return this.murmursService.findTimeline(req.user.userId);
  }

  @Post()
  async create(
    @Request() req,
    @Body('userId') userId: number,
    @Body('text') text: string,
  ) {
    if (req.user) {
      return { message: 'Authenticated users cannot create murmurs' };
    }

    return this.murmursService.create(userId, text);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.murmursService.delete(req.user.userId, Number(id));
  }
}
