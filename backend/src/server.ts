import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

let cachedServer: any;

const bootstrapServer = async () => {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
  await app.init();
  return serverlessExpress({ app: expressApp });
};

export const handler = async (event: any, context: any) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer(event, context);
};
