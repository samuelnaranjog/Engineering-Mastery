import { Module, Global } from '@nestjs/common';
import Database from 'better-sqlite3';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema/users.schema.js';
import { DRIZZLE } from './database.tokens.js';

export type DrizzleDBSchema = BetterSQLite3Database<typeof schema>;

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: (): DrizzleDBSchema => {
        const sqlite = new Database('./data.db');

        // Recommended SQLite pragmas for high concurrency & integrity
        sqlite.pragma('journal_mode = WAL');
        sqlite.pragma('foreign_keys = ON');

        return drizzle(sqlite, { schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DatabaseModule {}