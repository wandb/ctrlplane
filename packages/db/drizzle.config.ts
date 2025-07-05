import { defineConfig } from "drizzle-kit";

const postgresUrl = process.env.POSTGRES_URL;
if (!postgresUrl) {
  throw new Error("Missing POSTGRES_URL");
}

// Validate and safely transform the PostgreSQL URL
if (!postgresUrl.includes("://")) {
  throw new Error("Invalid POSTGRES_URL format");
}

const nonPoolingUrl = postgresUrl.replace(":6543", ":5432");

export default defineConfig({
  schema: "./dist/src/schema",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: { url: nonPoolingUrl },
  out: "./drizzle",
});
