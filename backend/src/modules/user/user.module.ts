import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserPublisher } from './user.publisher';
import { UserSubscriber } from './user.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserPublisher, UserSubscriber],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}