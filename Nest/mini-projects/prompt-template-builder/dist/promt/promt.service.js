var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, NotFoundException } from '@nestjs/common';
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
        const foundObj = this.promt.find(prompt => prompt.id === id);
        if (foundObj) {
            return foundObj;
        }
        throw new NotFoundException(`The prompt with id: ${id} couldn't be found`);
    }
    compilePrompt(id, variables) {
        const variableExtractor = /\{\{\s*(\w+)\s*\}\}/g;
        const prompt = this.findOne(id);
        const template = prompt.template;
        const requiredVars = [
            ...new Set([...template.matchAll(variableExtractor)].map(m => m[1]))
        ];
        console.log('Extracted Variables:', requiredVars);
        console.log('Extracted Variables:', variables);
        template.replace(variableExtractor, (match, key) => {
            if (key in variables) {
                return variables[key];
            }
        });
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