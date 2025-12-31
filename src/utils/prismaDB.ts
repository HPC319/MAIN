import type { PrismaClient as PrismaClientType } from "@prisma/client"
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = global as unknown as {
  prisma: PrismaClientType | undefined
}

// Dynamic import for CI environments where Prisma may not be generated
let PrismaClientConstructor: typeof PrismaClientType;
try {
  const prismaModule = require("@prisma/client");
  PrismaClientConstructor = prismaModule.PrismaClient;
} catch {
  // CI stub fallback
  PrismaClientConstructor = class {
    constructor() {
      throw new Error("PrismaClient not generated. Run: npx prisma generate");
    }
  } as unknown as typeof PrismaClientType;
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

export const prisma = globalForPrisma.prisma || new PrismaClientConstructor({
  adapter,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
