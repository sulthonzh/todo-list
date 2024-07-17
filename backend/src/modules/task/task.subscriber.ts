import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class TaskSubscriber {
  @EventPattern('task_created')
  handleTaskCreated(data: Record<string, unknown>) {
    console.log('Task created event received:', data);
  }
}
