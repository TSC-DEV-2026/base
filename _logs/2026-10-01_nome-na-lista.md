# Log — nome na lista de pessoas

**Data:** 2026-10-01  
**Sessão:** adição de feature

---

## ✅ O que foi feito

- A lista e o detalhe de pessoas passam a mostrar o id da pessoa e o nome
- O nome é lido no autenticador na hora da resposta. O banco deste sistema continua sem gravar nome

## 📁 Arquivos criados

- —

## ✏️ Arquivos modificados

- `backend/app/schemas/membership.py` — `full_name` no `MembershipOut`
- `backend/app/services/membership_service.py` — busca o nome no autenticador ao listar, criar e atualizar
- `backend/app/api/routes/memberships.py` — o detalhe usa essa leitura
- `backend/tests/test_membership_service.py` — o vínculo criado devolve o nome
- `frontend/src/types/api.ts` — `full_name` no tipo do vínculo
- `frontend/src/pages/MembershipsPage.tsx` — linha `id — nome`
- `frontend/src/pages/MembershipDetailPage.tsx` — título `id — nome`

## 🗑️ Arquivos removidos

- —

## 🔗 Dependências adicionadas

- —

## ⚠️ Decisões tomadas

- O nome não entra na tabela `memberships`. Cada item da página pergunta o estado da pessoa ao autenticador

## 🐛 Problemas encontrados e soluções

- —

## 📌 Pendências / próximos passos

- —
