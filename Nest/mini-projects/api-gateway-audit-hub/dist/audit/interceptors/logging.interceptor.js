var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { AuditService } from '../audit.service.js';
let LoggingInterceptor = class LoggingInterceptor {
    auditService;
    constructor(auditService) {
        this.auditService = auditService;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        const startTime = Date.now();
        const { method, url } = request;
        return next.handle().pipe(tap(() => {
            const durationMs = Date.now() - startTime;
            const statusCode = response.statusCode;
            const apiKeyOwner = request.apiKeyOwner ?? 'anonymous';
            this.auditService.recordLog({
                endpoint: url,
                method,
                statusCode,
                durationMs,
                apiKeyOwner,
                timestamp: new Date(),
            });
        }));
    }
};
LoggingInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuditService])
], LoggingInterceptor);
export { LoggingInterceptor };
//# sourceMappingURL=logging.interceptor.js.map