import { AuditLog } from './entities/audit-log.entity.js';
import { AuditLogDto } from './dto/audit-log.dto.js';
export declare class AuditService {
    id: number;
    logs: AuditLog[];
    findAll(): AuditLog[];
    recordLog(auditLogDto: AuditLogDto): void;
}
