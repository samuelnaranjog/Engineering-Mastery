import { Injectable } from '@nestjs/common';
import { CreateApiKeyDto } from './dto/create-api-key.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { apiKey } from './entities/api-key.entity.js';

@Injectable()
export class AuthService {

  apiKeysMap: Map<string, apiKey> = new Map();
  id = 0

  create(createApiKeyDto: CreateApiKeyDto): object {
    const newKey = crypto.randomUUID()
    const keyObj: apiKey = {
      id: this.id++,
      key: newKey,
      owner: createApiKeyDto.owner, 
      remainingQuota: createApiKeyDto.quota,
      createdAt: new Date()
    }

    this.apiKeysMap.set(keyObj.key, keyObj)
    console.log('POST: Checking current stored keys:', this.apiKeysMap )

    const returnObj = {
      key: keyObj['key'],
      quota: keyObj['remainingQuota']
    }
    return returnObj;
  }

  validateAndDeduct(apiKey: string) {
    console.log('Before: Checking current stored keys:', this.apiKeysMap )
    const keyRecord = this.apiKeysMap.get(apiKey);
    if (!keyRecord) return { valid: false, reason: 'NOT_FOUND' };
    if (keyRecord.remainingQuota <= 0) return { valid: false, reason: 'EXHAUSTED' };

    keyRecord.remainingQuota--;
    return { valid: true, owner: keyRecord.owner, record: keyRecord };
  } 
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
