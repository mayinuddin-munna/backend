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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body('text') text: string) {
    return this.murmursService.create(req.user.userId, text);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Request() req, @Param('id') id: string) {
    return this.murmursService.delete(req.user.userId, Number(id));
  }
}
