var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let AuthService = class AuthService {
    apiKeysMap = new Map();
    id = 0;
    create(createApiKeyDto) {
        const newKey = crypto.randomUUID();
        const keyObj = {
            id: this.id++,
            key: newKey,
            owner: createApiKeyDto.owner,
            remainingQuota: createApiKeyDto.quota,
            createdAt: new Date()
        };
        this.apiKeysMap.set(keyObj.key, keyObj);
        console.log('POST: Checking current stored keys:', this.apiKeysMap);
        const returnObj = {
            key: keyObj['key'],
            quota: keyObj['remainingQuota']
        };
        return returnObj;
    }
    validateAndDeduct(apiKey) {
        console.log('Before: Checking current stored keys:', this.apiKeysMap);
        const keyRecord = this.apiKeysMap.get(apiKey);
        if (!keyRecord)
            return { valid: false, reason: 'NOT_FOUND' };
        if (keyRecord.remainingQuota <= 0)
            return { valid: false, reason: 'EXHAUSTED' };
        keyRecord.remainingQuota--;
        return { valid: true, owner: keyRecord.owner, record: keyRecord };
    }
    findAll() {
        return `This action returns all auth`;
    }
    findOne(id) {
        return `This action returns a #${id} auth`;
    }
    update(id, updateAuthDto) {
        return `This action updates a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
};
AuthService = __decorate([
    Injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map