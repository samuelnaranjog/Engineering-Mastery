import { CreateApiKeyDto } from './dto/create-api-key.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
import { apiKey } from './entities/api-key.entity.js';
export declare class AuthService {
    apiKeysMap: Map<string, apiKey>;
    id: number;
    create(createApiKeyDto: CreateApiKeyDto): object;
    validateAndDeduct(apiKey: string): {
        valid: boolean;
        reason: string;
        owner?: undefined;
        record?: undefined;
    } | {
        valid: boolean;
        owner: string;
        record: apiKey;
        reason?: undefined;
    };
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAuthDto: UpdateAuthDto): string;
    remove(id: number): string;
}
