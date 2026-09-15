import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PromtModule } from './promt/promt.module.js';

@Module({
  imports: [PromtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
