import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'aws-sdk';
import { AppModule } from './app.module';
import configEnv from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  config.update({
    accessKeyId: configEnv().aws.accessKeyId,
    secretAccessKey: configEnv().aws.secretAccessKey,
    region: configEnv().aws.region,
  });
  await app.listen(process.env.PORT || 8080);
}

bootstrap();
