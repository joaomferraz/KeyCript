import { assertEquals } from "@std/assert";
import { OpenAPIHono } from "@hono/zod-openapi";
import { route } from "../src/route.ts";
import { app } from "../src/main.ts";

// Teste simples para GET /users/1
Deno.test("GET /users/1 should return user data", async () => {
  const req = new Request("http://localhost:8000/users/1");
  const response = await app.fetch(req);
  const data = await response.json();

  console.log(data);

  assertEquals(response.status, 200);
  assertEquals(data.id, 1);
  assertEquals(data.name, "Ultra-man");
  assertEquals(data.age, 20);
});

// Teste simples para GET /users/12
Deno.test("GET /users/12 should return user data", async () => {
  const req = new Request("http://localhost:8000/users/12");
  const response = await app.fetch(req);
  const data = await response.json();

  console.log(data);

  assertEquals(response.status, 200);
  assertEquals(data.id, 12);
  assertEquals(data.name, "Special User");
  assertEquals(data.age, 30);
});

// Teste com ID string - deve retornar erro de validação
Deno.test("GET /users/abc should return validation error for invalid ID", async () => {
  const req = new Request("http://localhost:8000/users/abc");
  const response = await app.fetch(req);
  const data = await response.json();

  console.log("String ID response:", data);

  assertEquals(response.status, 400);
  assertEquals(data.success, false);
  assertEquals(data.error.name, "ZodError");
});
