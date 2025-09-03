# 🛡️ KeyCript

**Gerenciador de senhas seguro e moderno - Projeto de estudo fullstack**

[![Deploy Status](https://img.shields.io/badge/deploy-coming_soon-yellow)](https://keycript.com)
[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Deno](https://img.shields.io/badge/deno-v1.40+-black?logo=deno)](https://deno.land/)
[![React](https://img.shields.io/badge/react-18+-blue?logo=react)](https://react.dev/)

> 🚧 **Em desenvolvimento** - MVP previsto para 5 semanas

## 🎯 Sobre o Projeto

KeyCript é um **gerenciador de senhas seguro** desenvolvido como projeto de estudo para aprender tecnologias modernas de desenvolvimento fullstack com foco em segurança digital.

### ✨ Funcionalidades (MVP)

- 🔐 **Autenticação segura** (registro/login/logout)
- 📝 **CRUD de credenciais** (criar/listar/editar/deletar)
- 🎲 **Gerador de senhas** com configurações personalizáveis
- 📱 **Interface responsiva** (mobile-first)
- 🔒 **Criptografia** das credenciais

### 🎪 Funcionalidades Futuras

- 📁 Organização por pastas/categorias
- 🕵️ Comunicação segura entre usuários (GPG)
- 📱 Progressive Web App (PWA)
- 📊 Exportação/importação de dados

## 🧰 Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| **Backend** | [Deno](https://deno.land/) + [Hono](https://hono.dev/) |
| **Frontend** | React + CSS Modules |
| **Banco de Dados** | MongoDB Atlas |
| **Deploy** | Deno Deploy + Vercel |
| **CI/CD** | GitHub Actions |

## 🚀 Como Executar

### Pré-requisitos
- [Deno](https://deno.land/) v1.40+
- [Node.js](https://nodejs.org/) v18+
- MongoDB (local ou Atlas)

### Backend
```bash
cd backend
cp .env.example .env
# Configure suas variáveis de ambiente
deno run --allow-net --allow-env --allow-read main.ts
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Docker (Opcional)
```bash
docker-compose up -d
```

## 📁 Estrutura do Projeto

```
keycript/
├── backend/           # API Deno + Hono
├── frontend/          # React SPA
├── docs/              # Documentação
├── docker-compose.yml # Ambiente local
└── .github/workflows/ # CI/CD
```

## 🛡️ Segurança

- ✅ Senhas hasheadas com bcrypt
- ✅ Autenticação JWT
- ✅ Validação de entrada
- ✅ HTTPS obrigatório
- ✅ CORS configurado
- 🔜 Criptografia client-side
- 🔜 Rate limiting

## 📈 Progresso do Desenvolvimento

- [x] **Semana 1**: Planejamento e setup
- [ ] **Semana 2**: Backend MVP + CI/CD
- [ ] **Semana 3**: Frontend MVP
- [ ] **Semana 4**: Funcionalidades core
- [ ] **Semana 5**: Deploy e finalização

## 🤝 Contribuindo

Este é um **projeto de estudo pessoal**, mas sugestões são bem-vindas!

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'Add: nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

## 📝 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 📚 Aprendizados

Este projeto foi desenvolvido para estudar:
- Arquitetura fullstack moderna
- Práticas de segurança em aplicações web
- DevOps e CI/CD
- Deploy em produção
- Desenvolvimento ágil

## 📞 Contato

**Desenvolvedor**: João  
**Site**: [keycript.com](https://keycript.com)  
**Repositório**: [GitHub](https://github.com/username/keycript)

---

⭐ **Star** este repositório se ele te ajudou a aprender algo novo!