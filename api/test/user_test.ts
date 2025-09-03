import { assertEquals } from "@std/assert";

// Teste simples para GET /users/1
Deno.test("GET /users/1 should return user data", async () => {
  const response = await fetch("http://localhost:8000/users/1");
  const data = await response.json();

  console.log(data);
  
  assertEquals(response.status, 200);
  assertEquals(data.id, 1);
  assertEquals(data.name, "Ultra-man");
  assertEquals(data.age, 20);
});

// Teste com ID string - deve retornar erro de validação
Deno.test("GET /users/abc should return validation error for invalid ID", async () => {
  const response = await fetch("http://localhost:8000/users/abc");
  const data = await response.json();

  console.log("String ID response:", data);
  
  assertEquals(response.status, 400);
  assertEquals(data.success, false);
  assertEquals(data.error.name, "ZodError");
});
