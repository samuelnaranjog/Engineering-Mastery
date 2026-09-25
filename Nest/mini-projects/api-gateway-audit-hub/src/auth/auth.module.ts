import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { ApiKeyGuard } from './guards/api-key/api-key.guard.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ApiKeyGuard],
  exports: [AuthService, ApiKeyGuard]
})

export class AuthModule {}
         