import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Injectable()
export class UserSubscriber {
  @EventPattern('user_created')
  handleUserCreated(data: Record<string, unknown>) {
    console.log('User created event received:', data);
  }
}
