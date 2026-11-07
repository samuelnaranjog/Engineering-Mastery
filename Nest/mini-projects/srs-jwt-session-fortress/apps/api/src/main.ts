import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });
  // Prefix all routes with /api (e.g., http://localhost:3001/api/users)
  app.setGlobalPrefix('api');

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // 1. Strip properties that do NOT have decorators in the DTO
      forbidNonWhitelisted: true,  // 2. Throw an error (400) if unexpected properties are sent
      transform: true,             // 3. Automatically transform payloads to match DTO instance types
    }),
  );

  // Allow requests from your React development server
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Required if passing cookies or authorization headers
  });

  await app.listen(3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
await bootstrap();
