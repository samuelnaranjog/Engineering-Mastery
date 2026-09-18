import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ContentModule } from './content/content.module.js';

@Module({
  imports: [AuthModule, ContentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
