import { MiddlewareHandler } from 'hono';
import { verifyJWT } from '../utils/jwt.ts';

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ message: 'Token ausente ou inválido' }, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await verifyJWT(token);
    c.set('userId', payload.iss);
    await next();
  } catch (_e) {
    return c.json({ message: 'Token inválido ou expirado' }, 401);
  }
};
