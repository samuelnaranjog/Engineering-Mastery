import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true
  });
  // Prefix all routes with /api (e.g., http://localhost:3001/api/users)
  app.setGlobalPrefix('api');

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
