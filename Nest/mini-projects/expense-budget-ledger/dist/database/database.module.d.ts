import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema/users.schema.js';
export type DrizzleDBSchema = BetterSQLite3Database<typeof schema>;
export declare class DatabaseModule {
}
