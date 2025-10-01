import { cors } from 'npm:hono/cors';

const ALLOW = (Deno.env.get('FRONT_ORIGINS') ?? 'http://localhost:5173')
  .split(',')
  .map(s => s.trim());

export const corsMiddleware = cors({
  origin: (origin?: string) => {
    if (!origin) return ALLOW[0];
    return ALLOW.includes(origin) ? origin : ALLOW[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  maxAge: 86400, // 24h
});
