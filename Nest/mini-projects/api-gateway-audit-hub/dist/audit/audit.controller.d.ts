import { AuditService } from './audit.service.js';
import { AuditLog } from './entities/audit-log.entity.js';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    findAll(): AuditLog[];
}
