import { PrismaPg } from '@prisma/adapter-pg'

// PrismaClient type - handle both generated and CI environments
// Use a type that works when Prisma is generated, with a proper fallback
type PrismaClientModule = typeof import("@prisma/client");
type PrismaClientType = 
  PrismaClientModule extends { PrismaClient: new (...args: unknown[]) => infer T }
    ? T
    : {
        user: {
          findUnique: (args: { where: Record<string, unknown> }) => Promise<unknown>;
          findFirst: (args: { where: Record<string, unknown> }) => Promise<unknown>;
          create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
          update: (args: { where: Record<string, unknown>; data: Record<string, unknown> }) => Promise<unknown>;
        };
      };

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
      create: () => Promise.resolve({ id: '', email: '', createdAt: new Date(), updatedAt: new Date() } as unknown),
      update: () => Promise.resolve({ id: '', email: '', createdAt: new Date(), updatedAt: new Date() } as unknown),
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
