import { PartialType } from '@nestjs/mapped-types';
import { CreateApiKeyDto } from './create-api-key.dto.js';

export class UpdateAuthDto extends PartialType(CreateApiKeyDto) {}
