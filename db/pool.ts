import { Pool } from "pg";

const globalForDatabase = globalThis as typeof globalThis & {
  currentsPool?: Pool;
};

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required");
  }

  const pool = new Pool({ connectionString });

  pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error", error);
  });

  return pool;
}

export function getPool(): Pool {
  const pool = globalForDatabase.currentsPool ?? createPool();

  if (process.env.NODE_ENV !== "production") {
    globalForDatabase.currentsPool = pool;
  }

  return pool;
}
