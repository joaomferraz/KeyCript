import {
  create,
  verify,
  getNumericDate,
  type Payload
} from 'https://deno.land/x/djwt@v3.0.2/mod.ts';

const encoder = new TextEncoder();

const jwtSecret = Deno.env.get('JWT_SECRET') || 'super-secret';
const key = await crypto.subtle.importKey(
  'raw',
  encoder.encode(jwtSecret),
  { name: 'HMAC', hash: 'SHA-256' },
  false,
  ['sign', 'verify']
);

export const generateJWT = async (userId: string): Promise<string> => {
  const payload: Payload = {
    iss: userId,
    exp: getNumericDate(60 * 60 * 24) // 24h
  };

  return await create({ alg: 'HS256', typ: 'JWT' }, payload, key);
};

export const verifyJWT = async (token: string) => {
  return await verify(token, key);
};
