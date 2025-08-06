import { Module } from '@nestjs/common';
// import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from 'src/auth/users.service';

@Module({
  providers: [UsersService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
