var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsNumber, IsDate, IsInt } from 'class-validator';
export class AuditLogDto {
    endpoint;
    method;
    statusCode;
    durationMs;
    apiKeyOwner;
    timestamp;
}
__decorate([
    IsString(),
    __metadata("design:type", String)
], AuditLogDto.prototype, "endpoint", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], AuditLogDto.prototype, "method", void 0);
__decorate([
    IsInt(),
    __metadata("design:type", Number)
], AuditLogDto.prototype, "statusCode", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], AuditLogDto.prototype, "durationMs", void 0);
__decorate([
    IsString(),
    __metadata("design:type", String)
], AuditLogDto.prototype, "apiKeyOwner", void 0);
__decorate([
    IsDate(),
    __metadata("design:type", Date)
], AuditLogDto.prototype, "timestamp", void 0);
//# sourceMappingURL=audit-log.dto.js.map