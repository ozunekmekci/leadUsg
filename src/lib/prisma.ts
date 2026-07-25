import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function getPrismaInstance(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;
  
  if (connectionString) {
    try {
      const pool = new Pool({ connectionString });
      const adapter = new PrismaPg(pool);
      return new PrismaClient({ adapter });
    } catch (error) {
      console.error("Failed to initialize Prisma with PostgreSQL adapter:", error);
    }
  }

  console.warn("DATABASE_URL is not configured. Falling back to Prisma Proxy Client for build-time safety.");
  
  // Safe Proxy Mock to prevent build-time crashes when DATABASE_URL is missing
  return new Proxy({} as PrismaClient, {
    get(target, prop) {
      if (prop === "$connect" || prop === "$disconnect") {
        return () => Promise.resolve();
      }
      
      return new Proxy({}, {
        get(subTarget, subProp) {
          return () => {
            console.warn(`Prisma call intercepted (no database connection): prisma.${String(prop)}.${String(subProp)}`);
            // Mock common query operations to return empty arrays/nulls gracefully
            if (String(subProp).includes("findMany")) {
              return Promise.resolve([]);
            }
            if (String(subProp).includes("count")) {
              return Promise.resolve(0);
            }
            return Promise.resolve(null);
          };
        }
      });
    }
  });
}

export const prisma = globalForPrisma.prisma ?? getPrismaInstance();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
