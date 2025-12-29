import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

db.$use(async (params, next) => {
  const tenantId = (params as any).tenantId;

  if (tenantId && params.model) {
    if (params.action === 'findMany' || params.action === 'findFirst' || params.action === 'findUnique') {
      params.args = params.args ?? {};
      params.args.where = { ...params.args.where, tenantId };
    }

    if (params.action === 'create') {
      params.args = params.args ?? {};
      params.args.data = { ...params.args.data, tenantId };
    }

    if (params.action === 'createMany' && Array.isArray(params.args?.data)) {
      params.args.data = params.args.data.map((item: any) => ({ ...item, tenantId }));
    }
  }

  return next(params);
});
