import { Global, Module } from "@nestjs/common";
import { DRIZZLE } from "./database.tokens.js";
import * as  schema  from './schema/index.js'
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

export type DrizzleDBSchema = BetterSQLite3Database<typeof schema>;

@Global()
@Module({
    providers: [{
        provide: DRIZZLE,
        useFactory: (): DrizzleDBSchema => {
            const sqlite  = new Database('./Data.db')
             sqlite.pragma('journal_mode = WAL');
            sqlite.pragma('foreign_keys = ON')
            return drizzle(sqlite, {schema});
        }
    }],
    exports: [DRIZZLE]
})
export class DatabaseModule {}