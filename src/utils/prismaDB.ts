import { PrismaPg } from '@prisma/adapter-pg'

// PrismaClient type - using dynamic import to handle CI environments
type PrismaClientType = import("@prisma/client").PrismaClient

const globalForPrisma = global as unknown as {
  prisma: PrismaClientType | undefined
}

// Dynamic import for CI environments where Prisma may not be generated
let PrismaClientConstructor: new (args?: { adapter?: PrismaPg }) => PrismaClientType;
try {
  const prismaModule = require("@prisma/client");
  PrismaClientConstructor = prismaModule.PrismaClient;
} catch {
  // CI stub fallback - this will only be used if Prisma client is not available
  PrismaClientConstructor = class {
    user = {
      findUnique: () => Promise.resolve(null),
      findFirst: () => Promise.resolve(null),
      create: () => Promise.resolve({}),
      update: () => Promise.resolve({}),
    } as PrismaClientType['user'];
    constructor() {
      throw new Error("PrismaClient not generated. Run: npx prisma generate");
    }
  } as unknown as new (args?: { adapter?: PrismaPg }) => PrismaClientType;
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

export const prisma = globalForPrisma.prisma || new PrismaClientConstructor({
  adapter,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
