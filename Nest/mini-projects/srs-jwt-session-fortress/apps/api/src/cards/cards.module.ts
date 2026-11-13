import { Module } from '@nestjs/common';
import { CardsService } from './cards.service.js';
import { CardsController } from './cards.controller.js';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from '../auth/auth.module.js';
import { ReviewSystemModule } from '../review-system/review-system.module.js';
@Module({
  imports: [HttpModule, AuthModule, ReviewSystemModule], // <-- Required to inject HttpService
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
