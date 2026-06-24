# Frontend — Gestão de TCCs (Angular)

Frontend em Angular (standalone + TypeScript) que consome a API Django REST do
projeto `projeto-gestao-tccs`. Usa `HttpClient` e gráficos com `ng2-charts` + `chart.js`.

Gerado com Angular CLI 22.

## Funcionalidades

- Dashboard com estatísticas (`/api/tccs/estatisticas/`) em gráficos.
- Listagem e busca de TCCs, Alunos, Professores, Cursos, Departamentos e Unidades Acadêmicas.
- Criar/editar TCC com upload de PDF (`multipart/form-data`).
- Link de download/visualização do PDF na listagem e no detalhe.
- Alteração do status do TCC (0–3) direto na listagem.

## Rotas

- `/` — Dashboard
- `/tccs` — listagem de TCCs
- `/tccs/new` — novo TCC
- `/tccs/:id` — detalhe
- `/tccs/:id/edit` — edição
- `/alunos`, `/professores`, `/cursos`, `/departamentos`, `/unidades-academicas`

## Pré-requisitos

- Node.js 20+
- Backend rodando em `http://127.0.0.1:8000` (veja o README do `projeto-gestao-tccs`).

## Servidor de desenvolvimento

```bash
npm install
npm run start
```

App em `http://localhost:4200`. A URL da API vem de `src/environments/environment.ts`
(`http://127.0.0.1:8000/api/`).

## Build de produção

```bash
npm run build
```

Saída em `dist/tcc-frontend/browser`. O build de produção troca o arquivo de ambiente
por `src/environments/environment.prod.ts` (veja `fileReplacements` em `angular.json`).

## Estrutura

```
src/app/
  services/    tcc.service.ts, lookups.service.ts   (HttpClient)
  models/      models.ts                            (interfaces + choices)
  pages/       dashboard, tcc-list, tcc-detail, tcc-form, entity-list
  shared/      header
  app.routes.ts, app.config.ts
src/environments/  environment.ts, environment.prod.ts
```

> Observação: o projeto usa a API standalone do Angular (sem NgModules). Por isso o
> roteamento fica em `app.routes.ts` e os providers (`provideHttpClient`,
> `provideCharts`) em `app.config.ts`, em vez de `app-routing.module.ts`.
