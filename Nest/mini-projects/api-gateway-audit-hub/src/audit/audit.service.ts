import { Injectable } from '@nestjs/common';
import { AuditLog } from './entities/audit-log.entity.js';
import { AuditLogDto } from './dto/audit-log.dto.js';
@Injectable()
export class AuditService {
    id = 0
    logs: AuditLog[] = []

    findAll(): AuditLog[] {
        return this.logs
    }

    recordLog(auditLogDto: AuditLogDto) {
        this.logs.push({
            id: this.id++,
            ...auditLogDto
        })

        console.log('Adding a new log')
    }
}
