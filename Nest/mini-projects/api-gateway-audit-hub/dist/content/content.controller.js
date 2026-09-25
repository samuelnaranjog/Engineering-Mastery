var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ContentService } from './content.service.js';
import { ApiKeyGuard } from '../auth/guards/api-key/api-key.guard.js';
import { LoggingInterceptor } from '../audit/interceptors/logging.interceptor.js';
import { ApiKeyOwner } from '../auth/decorators/api-key-owner.decorator.js';
let ContentController = class ContentController {
    contentService;
    constructor(contentService) {
        this.contentService = contentService;
    }
    findAll() {
        return this.contentService.findAll();
    }
    getArticles(owner) {
        return this.contentService.findByOwner(owner);
    }
};
__decorate([
    UseInterceptors(LoggingInterceptor),
    Get('articles/overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "findAll", null);
__decorate([
    UseInterceptors(LoggingInterceptor),
    UseGuards(ApiKeyGuard),
    Get('articles'),
    __param(0, ApiKeyOwner()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContentController.prototype, "getArticles", null);
ContentController = __decorate([
    Controller('content'),
    __metadata("design:paramtypes", [ContentService])
], ContentController);
export { ContentController };
//# sourceMappingURL=content.controller.js.map