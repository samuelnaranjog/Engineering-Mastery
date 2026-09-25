import { AuthService } from './auth.service.js';
import { CreateApiKeyDto } from './dto/create-api-key.dto.js';
import { UpdateAuthDto } from './dto/update-auth.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createApiKeyDto: CreateApiKeyDto): object;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAuthDto: UpdateAuthDto): string;
    remove(id: string): string;
}
