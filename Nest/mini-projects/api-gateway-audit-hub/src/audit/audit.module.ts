import { Module } from '@nestjs/common';
import { AuditService } from './audit.service.js';
import { AuditController } from './audit.controller.js';
import { LoggingInterceptor } from './interceptors/logging.interceptor.js';

@Module({
  controllers: [AuditController],
  providers: [AuditService, LoggingInterceptor],
  exports: [AuditService, LoggingInterceptor]
})
export class AuditModule {}
