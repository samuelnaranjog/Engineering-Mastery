// apps/api/src/calculate.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import type { CalculateInput } from '@project/shared-types';

export class CalculateDto implements CalculateInput {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  n1!: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  n2!: number;
}