import './opentelemetry'; // Import the OpenTelemetry setup
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import type { FastifyCookieOptions } from '@fastify/cookie'
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import { join } from 'path';
import { fastifyStatic } from '@fastify/static';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api');
  
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();

  app.register(fastifyStatic, {
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      { 
        type: 'http', 
        scheme: 'bearer', 
        bearerFormat: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customJs: '/public/swagger-custom.js',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  app.register(fastifyCookie, {
    secret: "a very long and complex secret key", // for cookies signature
    parseOptions: {}     // options for parsing cookies
  } as FastifyCookieOptions);

  app.register(fastifySession, {
    secret: 'a very long and complex secret key', // replace with a secure key
    cookie: {
      secure: true, // set to true in production
    },
    saveUninitialized: false,
  });

  await app.listen(3000);
}
bootstrap();