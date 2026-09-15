import { Module } from '@nestjs/common';
import { PromtService } from './promt.service.js';
import { PromtController } from './promt.controller.js';

@Module({
  controllers: [PromtController],
  providers: [PromtService],
})
export class PromtModule {}
