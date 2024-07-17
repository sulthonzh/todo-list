import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedServer;

const bootstrapServer = async () => {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await app.init();
  return serverlessExpress({ app: expressApp });
};

export const handler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer(event, context);
};
