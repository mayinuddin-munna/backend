import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';

@Module({
  controllers: [LikesController],
  providers: [LikesService],
  imports: [PrismaModule],
  exports: [LikesService],
})
export class LikesModule {}
