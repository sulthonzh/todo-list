import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './task.entity';
import { TaskPublisher } from './task.publisher';
import { TaskSubscriber } from './task.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService, TaskPublisher, TaskSubscriber],
  controllers: [TaskController],
})
export class TaskModule {}