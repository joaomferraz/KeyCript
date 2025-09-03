# 📅 Cronograma MVP - KeyCript
**Objetivo: MVP funcional e publicado em 5 semanas**

## 🎯 Foco: Funcionalidades ESSENCIAIS
- Autenticação básica (login/register)
- CRUD de credenciais
- Interface simples e funcional
- Deploy em produção

---

## ✅ Semana 1 - Planejamento e Setup (CONCLUÍDA)
- [x] Definição da stack tecnológica
- [x] Criação do PRD
- [x] Setup inicial do ambiente de desenvolvimento
- [x] Estruturação do projeto

---

## 🏗️ Semana 2 - Backend MVP + CI/CD (Deno + Hono + MongoDB)
### Entregas ESSENCIAIS:
- [ ] Setup básico Deno + Hono
- [ ] Conexão MongoDB Atlas
- [ ] Modelo User e Credential (simples)
- [ ] Auth: POST /register, POST /login
- [ ] CRUD: GET/POST/PUT/DELETE /credentials
- [ ] JWT middleware básico
- [ ] CORS configurado
- [ ] CI/CD básico: GitHub Actions para deploy automático
- [ ] Deploy contínuo no Deno Deploy a cada push

### ❌ REMOVER da Semana 2:
- Validação avançada com Zod (usar validação básica)
- Testes unitários complexos (manter testes básicos para CI)
- Recuperação de senha

---

## 🎨 Semana 3 - Frontend MVP (React + CSS básico)
### Entregas ESSENCIAIS:
- [ ] React + Vite setup
- [ ] CSS básico (sem Tailwind por enquanto)
- [ ] Telas: Login, Register, Dashboard
- [ ] Context simples para auth
- [ ] Listagem e formulário de credenciais
- [ ] Integração com API

### ❌ REMOVER da Semana 3:
- Tailwind CSS (usar CSS vanilla/modules)
- Layout complexo
- Validações avançadas no front

---

## 🔐 Semana 4 - Funcionalidades Core
### Entregas ESSENCIAIS:
- [ ] CRUD completo funcionando
- [ ] Gerador de senha básico (sem cálculo entropia)
- [ ] Criptografia básica das senhas no banco
- [ ] Interface mobile-first simples
- [ ] Logout funcional

### ❌ REMOVER da Semana 4:
- Pastas/categorias
- Busca avançada
- Criptografia client-side complexa
- GPG

---

## 🚀 Semana 5 - Deploy e Finalização
### Entregas CRÍTICAS:
- [ ] Revisão de infra: PaaS (Deno Deploy) vs VPS (DigitalOcean Droplet)
- [ ] Deploy backend na opção escolhida
- [ ] Deploy frontend no Vercel/Netlify (keycript.com)
- [ ] HTTPS configurado
- [ ] Monitoramento básico (uptime, logs, erros)
- [ ] Aplicação funcionando em produção
- [ ] README básico
- [ ] Fix bugs críticos

### ❌ REMOVER da Semana 5:
- PWA
- Service Workers
- Cache offline
- Testes automatizados avançados

---

## ⚠️ Semana 6 - Buffer (se necessário)
- Correções de bugs de produção
- Melhorias básicas de UX
- Documentação mínima
- Otimização do pipeline CI/CD
- Métricas de deploy e performance
- OpenTelemetry básico (observabilidade)
- Estudo scaling strategies (horizontal/vertical)

---

## 🎯 MVP Funcional = SUCESSO
**Critério único:** Aplicação online funcionando com:
- [x] Login/Register
- [x] Listar credenciais
- [x] Adicionar/editar/deletar credenciais
- [x] Gerador de senha básico

## 📝 Regras do MVP
- **FOCO TOTAL** nas funcionalidades essenciais
- **NÃO implementar** features extras antes do MVP estar pronto
- **Deploy primeiro**, melhorias depois
- **Tempo curto = decisões rápidas**