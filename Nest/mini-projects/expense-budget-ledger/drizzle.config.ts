import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/database/schema/index.ts',
  out: './drizzle/migrations',
  dbCredentials: {
    url: './data.db', // Path to the SQLite database file
  },
});