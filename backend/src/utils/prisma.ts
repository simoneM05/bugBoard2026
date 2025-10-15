// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Dichiarazione globale TypeScript
declare global {
  const prisma: PrismaClient | undefined;
}

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
