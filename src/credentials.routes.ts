import { OpenAPIHono, z } from '@hono/zod-openapi'
import type { MiddlewareHandler } from 'hono'
import { ObjectId } from 'npm:mongodb'

import { db } from './db.ts'
import { authMiddleware } from './middleware/auth.ts'
import { Credential } from './models/credential.ts'

/** Tipagem do contexto: middleware de auth injeta userId */
type Env = {
  Variables: {
    userId: string
  }
}

const route = new OpenAPIHono<Env>()
const credentials = db.collection<Credential>('credentials')

/** Aplica o middleware de autenticação a todas as rotas */
route.use('*', authMiddleware as MiddlewareHandler<Env>)

/** ================== SCHEMAS (Zod) ================== */
const Message = z.object({
  message: z.string().openapi({ example: 'Credencial não encontrada' }),
})

const IdParam = z.object({
  id: z
    .string()
    .length(24)
    .openapi({ example: '66f2c2a2b3c4d5e6f7a8b9c0' }),
})

/** Body base (o que o cliente envia) */
const CredentialBase = z.object({
  title: z.string().min(1).openapi({ example: 'GitHub' }),
  username: z.string().min(1).openapi({ example: 'joao' }),
  password: z.string().min(1).openapi({ example: 'segredo' }),
  folder: z.string().optional().openapi({ example: 'Work' }),
}).openapi('CredentialBase')

/** Body de criação/atualização */
const CreateCredential = CredentialBase
const UpdateCredential = CredentialBase.partial()

/** Resposta completa (o que a API devolve) */
const CredentialOut = CredentialBase.extend({
  _id: z.string().openapi({ example: '66f2...' }),
  userId: z.string().openapi({ example: 'u1' }),
})

type CredOut = z.infer<typeof CredentialOut>

/** Helper para converter Mongo docs -> resposta com _id string */
function toOut(doc: any): CredOut {
  const { _id, ...rest } = doc
  return { _id: String(_id), ...rest }
}

/** ================== ROTAS ================== */

/** GET /credentials – listar do usuário autenticado */
route.openapi(
  {
    method: 'get',
    path: '/',
    tags: ['Credentials'],
    summary: 'Listar credenciais do usuário',
    security: [{ bearerAuth: [] }],
    responses: {
      200: {
        description: 'OK',
        content: { 'application/json': { schema: z.array(CredentialOut) } },
      },
      401: {
        description: 'Não autenticado',
        content: { 'application/json': { schema: Message } },
      },
    },
  },
  async (c) => {
    const userId = c.get('userId')
    const docs = await credentials.find({ userId }).toArray()
    const data = docs.map(toOut)
    return c.json(data, 200 as const)
  },
)

/** POST /credentials – criar credencial */
route.openapi(
  {
    method: 'post',
    path: '/',
    tags: ['Credentials'],
    summary: 'Criar credencial',
    security: [{ bearerAuth: [] }],
    request: {
      body: {
        required: true,
        content: { 'application/json': { schema: CreateCredential } },
      },
    },
    responses: {
      201: {
        description: 'Criado',
        content: { 'application/json': { schema: CredentialOut } },
      },
      400: {
        description: 'Dados inválidos',
        content: { 'application/json': { schema: Message } },
      },
      401: {
        description: 'Não autenticado',
        content: { 'application/json': { schema: Message } },
      },
    },
  },
  async (c) => {
    const userId = c.get('userId')
    const dto = await c.req.valid('json') // CreateCredential

    const doc = { userId, ...dto }
    const result = await credentials.insertOne(doc)

    const created: CredOut = {
      _id: String(result.insertedId),
      userId,
      ...dto,
    }
    return c.json(created, 201 as const)
  },
)

/** GET /credentials/{id} – obter por id */
route.openapi(
  {
    method: 'get',
    path: '/{id}',
    tags: ['Credentials'],
    summary: 'Obter credencial por ID',
    security: [{ bearerAuth: [] }],
    request: { params: IdParam },
    responses: {
      200: {
        description: 'OK',
        content: { 'application/json': { schema: CredentialOut } },
      },
      401: {
        description: 'Não autenticado',
        content: { 'application/json': { schema: Message } },
      },
      404: {
        description: 'Não encontrada',
        content: { 'application/json': { schema: Message } },
      },
    },
  },
  async (c) => {
    const userId = c.get('userId')
    const { id } = c.req.valid('param')

    const doc = await credentials.findOne({ _id: new ObjectId(id), userId })
    if (!doc) return c.json({ message: 'Credencial não encontrada' }, 404 as const)

    return c.json(toOut(doc), 200 as const)
  },
)

/** PUT /credentials/{id} – atualizar */
route.openapi(
  {
    method: 'put',
    path: '/{id}',
    tags: ['Credentials'],
    summary: 'Atualizar credencial',
    security: [{ bearerAuth: [] }],
    request: {
      params: IdParam,
      body: {
        required: true,
        content: { 'application/json': { schema: UpdateCredential } },
      },
    },
    responses: {
      200: {
        description: 'OK',
        content: { 'application/json': { schema: CredentialOut } },
      },
      400: {
        description: 'Dados inválidos',
        content: { 'application/json': { schema: Message } },
      },
      401: {
        description: 'Não autenticado',
        content: { 'application/json': { schema: Message } },
      },
      404: {
        description: 'Não encontrada',
        content: { 'application/json': { schema: Message } },
      },
    },
  },
  async (c) => {
    const userId = c.get('userId')
    const { id } = c.req.valid('param')
    const dto = await c.req.valid('json') // UpdateCredential

    const res = await credentials.updateOne(
      { _id: new ObjectId(id), userId },
      { $set: dto },
    )

    if (res.matchedCount === 0) {
      return c.json({ message: 'Credencial não encontrada' }, 404 as const)
    }

    const updated = await credentials.findOne({ _id: new ObjectId(id), userId })
    return c.json(toOut(updated), 200 as const)
  },
)

/** DELETE /credentials/{id} – remover */
route.openapi(
  {
    method: 'delete',
    path: '/{id}',
    tags: ['Credentials'],
    summary: 'Excluir credencial',
    security: [{ bearerAuth: [] }],
    request: { params: IdParam },
    responses: {
      204: { description: 'Excluída' },
      401: {
        description: 'Não autenticado',
        content: { 'application/json': { schema: Message } },
      },
      404: {
        description: 'Não encontrada',
        content: { 'application/json': { schema: Message } },
      },
    },
  },
  async (c) => {
    const userId = c.get('userId')
    const { id } = c.req.valid('param')

    const res = await credentials.deleteOne({ _id: new ObjectId(id), userId })
    if (res.deletedCount === 0) {
      return c.json({ message: 'Credencial não encontrada' }, 404 as const)
    }

    // 204 sem body (compatível com a spec acima)
    return c.body(null, 204 as const)
  },
)

export default route
