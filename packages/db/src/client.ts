import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

import { env } from "./config.js";
import * as schema from "./schema/index.js";

const { Pool } = pg;
export const pool = new Pool({
  max: 30,
  idleTimeoutMillis: 2000,
  connectionString: env.POSTGRES_URL,
  ssl: false,
});

export const db = drizzle(pool, { schema });
