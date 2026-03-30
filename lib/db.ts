import { Pool } from 'pg';

// Using a connection pool for Postgres
// In Next.js, we want to prevent multiple connections exhausting the DB in dev mode due to Hot Reloads
const globalForPg = global as unknown as { pgPool: Pool };

export const db = globalForPg.pgPool || new Pool({
  // Relies on standard PG environment variables: PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT
  // Or you can easily pass connectionString: process.env.DATABASE_URL
  connectionString: process.env.DATABASE_URL,
});

if (process.env.NODE_ENV !== 'production') globalForPg.pgPool = db;
