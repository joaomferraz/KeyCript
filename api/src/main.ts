import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { route } from "./route.ts";

const app = new OpenAPIHono();

app.openapi(route, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id: Number(id),
    age: 20,
    name: "Ultra-man",
  });
});

// The OpenAPI documentation will be available at /doc
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));

app.get("/", (c) => {
  return c.json({
    message: "Welcome to the API",
    sdfsdf: 'sdfsdf'
  });
});

Deno.serve(app.fetch);
