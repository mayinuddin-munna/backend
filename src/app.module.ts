import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LikesModule } from './likes/likes.module';
import { FollowsModule } from './follows/follows.modules';
import { MurmursModule } from './murmurs/murmurs.modules';

@Module({
  imports: [
    PrismaModule,
    LikesModule,
    FollowsModule,
    MurmursModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
