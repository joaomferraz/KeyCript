import { Hono } from 'hono';
import { db } from './db.ts';
import { generateJWT } from './utils/jwt.ts';
import { User } from './models/user.ts';

const auth = new Hono();

const users = db.collection<User>('users');

// POST /register
auth.post('/register', async (c) => {
  const { username, password } = await c.req.json();

  const exists = await users.findOne({ username });
  if (exists) {
    return c.json({ message: 'Usuário já existe' }, 409);
  }

  const user: User = { username, password };
  await users.insertOne(user);

  return c.json({ message: 'Usuário criado com sucesso' });
});

// POST /login
auth.post('/login', async (c) => {
  const { username, password } = await c.req.json();

  const user = await users.findOne({ username });
  if (!user || user.password !== password) {
    return c.json({ message: 'Credenciais inválidas' }, 401);
  }

  const token = await generateJWT(user._id?.toString() || user.username);
  return c.json({ token });
});

export default auth;
