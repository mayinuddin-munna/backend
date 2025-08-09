import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MurmursController } from './murmurs.controller';
import { MurmursService } from './murmurs.service';

@Module({
  controllers: [MurmursController],
  providers: [MurmursService],
  imports: [PrismaModule],
  exports: [MurmursService],
})
export class MurmursModule {}
