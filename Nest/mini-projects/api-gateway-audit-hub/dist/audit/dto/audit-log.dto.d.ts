export declare class AuditLogDto {
    endpoint: string;
    method: string;
    statusCode: number;
    durationMs: number;
    apiKeyOwner: string;
    timestamp: Date;
}
