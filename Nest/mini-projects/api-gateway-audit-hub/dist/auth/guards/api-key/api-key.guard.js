var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpException, Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../auth.service.js';
let ApiKeyGuard = class ApiKeyGuard {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];
        if (!apiKey || typeof apiKey !== 'string') {
            throw new UnauthorizedException('Invalid Type or missing API key');
        }
        const result = this.authService.validateAndDeduct(apiKey);
        console.log('The quota and API check for this key returned:', result);
        if (!result.valid) {
            if (result.reason === 'NOT_FOUND') {
                throw new UnauthorizedException('Invalid or missing API key');
            }
            throw new HttpException('API key quota depleted', HttpStatus.TOO_MANY_REQUESTS);
        }
        request.apiKeyOwner = result.owner;
        return true;
    }
};
ApiKeyGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AuthService])
], ApiKeyGuard);
export { ApiKeyGuard };
//# sourceMappingURL=api-key.guard.js.map