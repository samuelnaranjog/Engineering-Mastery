var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let AuditService = class AuditService {
    id = 0;
    logs = [];
    findAll() {
        return this.logs;
    }
    recordLog(auditLogDto) {
        this.logs.push({
            id: this.id++,
            ...auditLogDto
        });
        console.log('Adding a new log');
    }
};
AuditService = __decorate([
    Injectable()
], AuditService);
export { AuditService };
//# sourceMappingURL=audit.service.js.map