import { Controller, Get } from '@nestjs/common';
import { AuditService } from './audit.service.js';
import { AuditLog } from './entities/audit-log.entity.js';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}
  
  @Get('logs')
  findAll(): AuditLog[] {
    return this.auditService.findAll()
  }

  

}
