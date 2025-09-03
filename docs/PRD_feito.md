# 🛡️ KeyCript

## 🧠 Visão Geral

Projeto de estudo com objetivo de construir um **gerenciador de senhas seguro**, com foco em aprendizado prático de:

- Arquitetura fullstack moderna
- Práticas de segurança digital
- Integração com múltiplas plataformas (Web, Desktop, Mobile PWA)

---

## 🎯 Objetivos

- Criar uma aplicação de **armazenamento e gerenciamento de credenciais**
- Aprender e aplicar tecnologias modernas: Deno, Hono, MongoDB, React, PWA, GPG
- Criar uma base para futuras evoluções (ex: FlutterFlow mobile app)

---

## 📦 Funcionalidades

### 🔐 Autenticação
- [x] Registro
- [x] Login
- [x] Logout
- [x] Recuperar senha (email/token)

### 🧾 CRUD de Credenciais
- [x] Criar
- [x] Listar
- [x] Editar
- [x] Deletar

### 📁 Organização por Pastas
- Agrupar credenciais por categorias

### 🔐 Geração de Senhas Seguras
- Comprimento personalizável
- Letras maiúsculas / minúsculas
- Números e símbolos
- Cálculo de entropia

### 🕵️‍♂️ Mensagens entre "espiões"
- Comunicação segura entre usuários usando **GPG (Kleopatra)**

---

## 🧰 Stack Tecnológica

| Camada        | Tecnologia                                                 |
| ------------- | ---------------------------------------------------------- |
| **Backend**   | [Deno](https://deno.com/) + [Hono](https://hono.dev/docs/) |
| **Frontend**  | React + Tailwind CSS                                       |
| **Banco**     | MongoDB Atlas                                              |
| **Deploy**    | Deno Deploy + Vercel/Netlify (keycript.com)                |
| **Segurança** | GPG (Kleopatra), HTTPS, validações com Zod                 |
| **Mobile**    | PWA Offline-First, Mobile-First                            |

---

## 💻 Plataformas e Dispositivos

- ✅ **Web** (responsivo)
- ✅ **Desktop** (via PWA ou Electron no futuro)
- ✅ **Mobile PWA**
  - Suporte a **modo offline para leitura**
  - Para criar credenciais, o usuário precisa estar **online**

---

## 📋 Requisitos Não Funcionais

- Interface leve, rápida e segura
- Mobile-first, com foco em acessibilidade e responsividade
- Armazenamento criptografado localmente (ex: IndexedDB + Crypto API)
- Modularidade para evoluções futuras

---

## ⏱️ Deadline

**6 semanas** de desenvolvimento

---

## 🚀 Pós-Desafio (Fase 2)

- App nativo com [FlutterFlow](https://www.flutterflow.io/)
- Autenticação por biometria ou PIN
- Exportação/backup seguro
- Sincronização em tempo real via WebSockets
- Chat seguro entre usuários (criptografia ponta-a-ponta)

---

## 📌 Próximos Passos

- [x] Definir nome oficial do projeto: **KeyCript** (keycript.com)
- [ ] Estruturar repositório (monorepo ou front/back separados)
- [ ] Criar fluxos de tela e wireframes
- [ ] Iniciar backend (Hono + MongoDB)
- [ ] Criar layout inicial em React com autenticação
- [ ] Planejar versão PWA/offline

---

## 📝 Extras sugeridos

- Usar Zod para validações front + back
- Documentar API com Swagger/OpenAPI via Hono
- Implementar logs de eventos críticos
- Automatizar deploy com CI/CD básico