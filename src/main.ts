import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import { route } from './route.ts';
import authRoutes from './auth.routes.ts';
import { Hono } from 'hono';
import credentialRoutes from './credentials.routes.ts';

// app principal para rotas documentadas
const openapiApp = new OpenAPIHono();

// rota GET /users/{id} com documentação OpenAPI
openapiApp.openapi(route, (c) => {
  const { id } = c.req.valid('param');

  if (id === '12') {
    return c.json({
      id: 12,
      age: 30,
      name: 'Special User'
    });
  }

  return c.json({
    id: Number(id),
    age: 20,
    name: 'Ultra-man'
  });
});

// Documentação
openapiApp.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API'
  }
});

openapiApp.get('/ui', swaggerUI({ url: '/doc' }));

// Rota base
openapiApp.get('/', (c) => {
  return c.json({
    message: 'Welcome to the API',
    sdfsdf: 'sdfsdf'
  });
});

// root unifica tudo
const app = new Hono();
app.route('/auth', authRoutes); // rotas protegidas
app.route('/credentials', credentialRoutes);
app.route('/', openapiApp as unknown as Hono); // documentação + públicas

// servidor
if (import.meta.main) {
  Deno.serve({ port: 4000 }, app.fetch);
  console.log(`Servidor rodando na porta 4000`);
  console.log(`Documentação OpenAPI disponível em http://localhost:4000/doc`);
}
