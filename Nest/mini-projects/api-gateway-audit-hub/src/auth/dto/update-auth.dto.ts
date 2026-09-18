import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-api-key.dto.js';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
