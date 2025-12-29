import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST ?? 'localhost',
  port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  password: process.env.REDIS_PASSWORD,
  lazyConnect: true,
});

function namespaceKey(tenantId: string, key: string): string {
  return `tenant:${tenantId}:${key}`;
}

export async function get<T>(tenantId: string, key: string): Promise<T | null> {
  const data = await redis.get(namespaceKey(tenantId, key));
  return data ? JSON.parse(data) : null;
}

export async function set(tenantId: string, key: string, value: unknown, ttl: number = 3600): Promise<void> {
  await redis.setex(namespaceKey(tenantId, key), ttl, JSON.stringify(value));
}

export async function del(tenantId: string, key: string): Promise<void> {
  await redis.del(namespaceKey(tenantId, key));
}

export async function invalidate(tenantId: string, pattern: string): Promise<void> {
  const keys = await redis.keys(namespaceKey(tenantId, pattern));
  if (keys.length > 0) {
    await redis.del(...keys);
  }
}
