import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class TriggerGenerationDto {
  // @IsNumber()
  // @IsNotEmpty()
  // userId: number;

  @IsString()
  @IsNotEmpty()
  deck: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}