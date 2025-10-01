import { db } from './db.ts'
import { generateJWT } from './utils/jwt.ts'
import { User } from './models/user.ts'

import { OpenAPIHono, z } from '@hono/zod-openapi'

const auth = new OpenAPIHono()

const users = db.collection<User>('users')

const RegisterBody = z.object({
  username: z.string().min(3).openapi({ example: 'joao' }),
  password: z.string().min(6).openapi({ example: 'minha-senha' }),
}).openapi('RegisterBody')

const LoginBody = z.object({
  username: z.string().openapi({ example: 'joao' }),
  password: z.string().openapi({ example: 'minha-senha' }),
}).openapi('LoginBody')

const Message = z.object({
  message: z.string().openapi({ example: 'Usuário criado com sucesso' }),
})

const AuthToken = z.object({
  token: z.string().openapi({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
})

auth.openapi(
  {
    method: 'post',
    path: '/register',
    tags: ['Auth'],
    summary: 'Registrar usuário',
    request: {
      body: {
        required: true,
        content: { 'application/json': { schema: RegisterBody } },
      },
    },
    responses: {
      201: { description: 'Usuário criado', content: { 'application/json': { schema: Message } } },
      409: { description: 'Usuário já existe', content: { 'application/json': { schema: Message } } },
      400: { description: 'Dados inválidos', content: { 'application/json': { schema: Message } } },
    },
  },
  async (c) => {
    const dto = await c.req.valid('json') // { username, password }
    const exists = await users.findOne({ username: dto.username })
    if (exists) {
      return c.json({ message: 'Usuário já existe' }, 409)
    }

    const user: User = { username: dto.username, password: dto.password }
    await users.insertOne(user)

    return c.json({ message: 'Usuário criado com sucesso' }, 201)
  }
)

auth.openapi(
  {
    method: 'post',
    path: '/login',
    tags: ['Auth'],
    summary: 'Login',
    request: {
      body: {
        required: true,
        content: { 'application/json': { schema: LoginBody } },
      },
    },
    responses: {
      200: { description: 'OK', content: { 'application/json': { schema: AuthToken } } },
      401: { description: 'Credenciais inválidas', content: { 'application/json': { schema: Message } } },
      400: { description: 'Dados inválidos', content: { 'application/json': { schema: Message } } },
    },
  },
  async (c) => {
    const dto = await c.req.valid('json') // { username, password }

    const user = await users.findOne({ username: dto.username })
    if (!user || user.password !== dto.password) {
      return c.json({ message: 'Credenciais inválidas' }, 401)
    }

    const token = await generateJWT(user._id?.toString() || user.username)
    return c.json({ token }, 200)
  }
)

export default auth
