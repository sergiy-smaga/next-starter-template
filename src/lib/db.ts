//lib/db.ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
// You can use cache from react to cache the client during the same request
// this is not mandatory and only has an effect for server components
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";
import { cache } from "react";

export interface Env {
  BD: D1Database;
}

export const getPrisma = cache(() => {
  const env = getCloudflareContext().env as Env;
  const adapter = new PrismaD1(env.BD);
  return new PrismaClient({ adapter });
});

// If you need access to `getCloudflareContext` in a static route (i.e. ISR/SSG), you should use the async version of `getCloudflareContext` to get the context.
export const getDbAsync = async () => {
  const { env } = await getCloudflareContext({ async: true });
  const adapter = new PrismaD1(env.BD);
  const prisma = new PrismaClient({ adapter });
  return prisma;
};
