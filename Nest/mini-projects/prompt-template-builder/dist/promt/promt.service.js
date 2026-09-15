var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let PromtService = class PromtService {
    promt = [];
    id = 0;
    create(createPromtDto) {
        this.id++;
        const currentDate = new Date();
        const newPrompt = {
            ...createPromtDto,
            id: this.id,
            createdAt: currentDate,
            updatedAt: currentDate
        };
        console.log('Adding new promt: ', newPrompt);
        this.promt.push(newPrompt);
        return newPrompt;
    }
    findAll(tags) {
        if (!tags || tags.length === 0) {
            return this.promt;
        }
        return this.promt.filter(promtObj => promtObj.tags.some(tag => tags.includes(tag)));
    }
    findOne(id) {
        return `This action returns a #${id} promt`;
    }
    update(id, updatePromtDto) {
        return `This action updates a #${id} promt`;
    }
    remove(id) {
        return `This action removes a #${id} promt`;
    }
};
PromtService = __decorate([
    Injectable()
], PromtService);
export { PromtService };
//# sourceMappingURL=promt.service.js.map