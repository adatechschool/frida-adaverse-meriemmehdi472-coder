import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// If DATABASE_URL is not set (e.g. during early dev without a DB),
// avoid throwing at import time so the app can start. Export a proxy
// that will give a clear runtime error when any DB operation is used.
let _db: unknown;

if (!process.env.DATABASE_URL) {
  // eslint-disable-next-line no-console
  console.warn("Warning: DATABASE_URL is missing. Database operations will fail at runtime.");

  // Create a proxy that throws a clear error when any property/method is accessed.
  const handler: ProxyHandler<Record<string, unknown>> = {
    get() {
      return () => {
        throw new Error("DATABASE_URL is missing. Set DATABASE_URL in your environment (e.g. .env.local) to enable database operations.");
      };
    },
  };

  const proxy = new Proxy({}, handler);
  // mark proxy so callers can detect absence of a real DB (useful in dev)
  (proxy as any).__isMock = true;
  _db = proxy;
} else {
  const realDb = drizzle(process.env.DATABASE_URL, { schema });
  (realDb as any).__isMock = false;
  _db = realDb;
}

export const db = _db as any;

export * from "./schema";
