import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class UserPublisher {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL],
        queue: 'task_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  publishUserCreatedEvent(user: any) {
    return this.client.emit<any>('user_created', user);
  }
}
