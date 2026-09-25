import { Module } from '@nestjs/common';
import { ContentService } from './content.service.js';
import { ContentController } from './content.controller.js';
import { ApiKeyGuard } from '../auth/guards/api-key/api-key.guard.js';
import { AuthModule } from '../auth/auth.module.js';
import { LoggingInterceptor } from '../audit/interceptors/logging.interceptor.js';
import { AuditModule } from '../audit/audit.module.js';


@Module({
  imports: [AuthModule, AuditModule],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
