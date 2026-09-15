import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activate the global validation pipe here:
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // 1. Strip properties that do NOT have decorators in the DTO
      forbidNonWhitelisted: true,  // 2. Throw an error (400) if unexpected properties are sent
      transform: true,             // 3. Automatically transform payloads to match DTO instance types
    }),
  );

  await app.listen(3000);
}
bootstrap();
