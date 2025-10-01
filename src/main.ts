// src/main.ts
import 'https://deno.land/std@0.224.0/dotenv/load.ts'
import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { corsMiddleware } from './middleware/cors.ts' // confirme o caminho: middleware/ vs middlewares/
import { route } from './route.ts'
import authRoutes from './auth.routes.ts'
import credentialRoutes from './credentials.routes.ts'

const app = new OpenAPIHono()

// CORS antes das rotas
app.use('*', corsMiddleware)

// (1) REGISTRA o esquema de segurança JWT para o cadeado do Swagger
app.openAPIRegistry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
})


// (2) JSON do OpenAPI
app.doc('/doc', {
  openapi: '3.1.0',
  info: { title: 'KeyCript API', version: '1.0.0' },
  security: [{ bearerAuth: [] }],
  servers: [{ url: Deno.env.get('API_BASE') ?? 'http://localhost:4000' }],
})

// (3) Swagger UI
app.get('/docs', swaggerUI({ url: '/doc' }))

// Health
app.get('/', (c) => c.json({ message: 'Welcome to the API' }))

// (4) Suas rotas reais (estas precisam ser OpenAPIHono + app.openapi(...) lá dentro)
app.route('/auth', authRoutes)
app.route('/credentials', credentialRoutes)

// Servidor
if (import.meta.main) {
  const port = Number(Deno.env.get('PORT') ?? 4000)
  console.log(`Servidor rodando: http://localhost:${port}`)
  console.log(`Swagger:          http://localhost:${port}/docs`)
  Deno.serve({ port }, app.fetch)
}

export default app
