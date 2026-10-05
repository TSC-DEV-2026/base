# Log — sistema base

**Data:** 2026-10-01  
**Sessão:** setup inicial

---

## ✅ O que foi feito

- API e site do sistema de negócio `base`, para cadastrar pessoas e validar CPF e senha no autenticador
- Empresa, vínculo e sessão local (cookie no site, JWT desta API). Senha não fica neste banco
- Cadastro público, login, troca de empresa, convite de pessoa, esqueci/redefinir/trocar senha e verificação de e-mail
- Pasta `mobile/` vazia
- Banco `base` criado e migration aplicada
- Testes unitários sem banco real

## 📁 Arquivos criados

- `backend/` — API FastAPI, Alembic, testes e `.env` local (não versionado)
- `frontend/` — site Vite em `http://localhost:5174`, com proxy `/api` para a porta 8002
- `mobile/.gitkeep` — app ainda não existe
- `.gitignore`

## ✏️ Arquivos modificados

- —

## 🗑️ Arquivos removidos

- —

## 🔗 Dependências adicionadas

- API: FastAPI, SQLAlchemy, psycopg, Alembic, Pydantic, python-jose, slowapi, httpx, boto3, pytest
- Site: React, Vite, TypeScript, Tailwind, Axios, Zustand, Lucide, Radix (button/label)

## ⚠️ Decisões tomadas

- Nome genérico `base`. API na porta 8002 e site na 5174, para não colidir com o autenticador
- O vínculo grava só `person_id`, `tenant_id` e `role`. O nome no cadastro de pessoa vai ao autenticador porque `POST /internal/people` exige `full_name`
- A lista de pessoas mostra o `person_id` e o papel. Nome e e-mail da sessão vêm do autenticador no login e no `/auth/me`
- O seed liga a empresa `Base` à pessoa admin que já existe no autenticador, sem copiar a senha
- `storage_service` existe para o R2, sem tela de upload
- A verificação de e-mail e o reenvio foram acrescentados nas rotas internal do autenticador, porque este site precisa repassá-las

## 🐛 Problemas encontrados e soluções

- O segundo POST do teste de cadastro usava o CSRF antigo, trocado no login → o site lê o cookie a cada request; o teste passou a reler o cookie
- Sem ferramenta de browser nesta sessão. O login e o cadastro foram conferidos na API, contra o autenticador no ar

## 📌 Pendências / próximos passos

- Conferir o fluxo na tela: `http://localhost:5174`
- O cadastro de prova criou a pessoa `Pessoa Base` e a empresa `Empresa Teste`
- Preencher `R2_*` quando houver arquivo de produto
