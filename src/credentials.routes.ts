import { Hono } from 'hono';
import { db } from './db.ts';
import { authMiddleware } from './middleware/auth.ts';
import { ObjectId } from 'npm:mongodb';

type MyEnv = {
  Variables: {
    userId: string;
  };
};

const route = new Hono<MyEnv>();

interface Credential {
  _id?: ObjectId | string;
  userId: string;
  title: string;
  username: string;
  password: string;
  folder?: string;
}

const credentials = db.collection<Credential>('credentials');

// aplica o middleware de autenticação em todas as rotas
route.use('*', authMiddleware);

// GET /credentials → lista todas as credenciais do usuário autenticado
route.get('/', async (c) => {
  const userId = c.get('userId') as string;
  const creds = await credentials.find({ userId }).toArray();
  return c.json(creds);
});

// POST /credentials → cria uma nova credencial
route.post('/', async (c) => {
  const userId = c.get('userId') as string;
  const { title, username, password, folder } = await c.req.json();

  const newCred: Credential = {
    userId,
    title,
    username,
    password,
    folder
  };

  const result = await credentials.insertOne(newCred);
  return c.json({ insertedId: result });
});

// PUT /credentials/:id → edita uma credencial existente
route.put('/:id', async (c) => {
  const userId = c.get('userId') as string;
  const id = c.req.param('id');

  const { title, username, password, folder } = await c.req.json();

  const result = await credentials.updateOne(
    { _id: new ObjectId(id), userId },
    { $set: { title, username, password, folder } }
  );

  if (result.matchedCount === 0) {
    return c.json({ message: 'Credencial não encontrada' }, 404);
  }

  return c.json({ updated: true });
});

// DELETE /credentials/:id → remove uma credencial
route.delete('/:id', async (c) => {
  const userId = c.get('userId') as string;
  const id = c.req.param('id');

  const result = await credentials.deleteOne({ _id: new ObjectId(id), userId });

  if (result.deletedCount === 0) {
    return c.json({ message: 'Credencial não encontrada' }, 404);
  }

  return c.json({ deleted: true });
});

export default route;
