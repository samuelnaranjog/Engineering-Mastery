import { Module } from '@nestjs/common';
import { ReviewSystemService } from './review-system.service.js';

@Module({
  providers: [ReviewSystemService],
  exports: [ReviewSystemService], // Optional: if other modules need to trigger reviews
})
export class ReviewSystemModule {}