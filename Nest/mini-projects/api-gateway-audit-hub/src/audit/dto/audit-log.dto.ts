import { IsString, IsNumber, IsDate, IsInt } from 'class-validator';

export class AuditLogDto {

  @IsString()
  endpoint: string;

  @IsString()
  method: string;

  @IsInt()
  statusCode: number;

  @IsNumber()
  durationMs: number;

  @IsString()
  apiKeyOwner: string;

  @IsDate()
  timestamp: Date;
}