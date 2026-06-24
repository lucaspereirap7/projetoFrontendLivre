# Sistema de Gestão de TCCs

Sistema web de gestão de Trabalhos de Conclusão de Curso (TCC).

- **Backend:** Django REST Framework (`projeto-gestao-tccs/`)
- **Frontend:** Angular standalone + ng2-charts (`tcc-frontend/`)

## 👥 Contribuidores (Grupo)

* **João Victor Matos** - [GitHub Profile](https://github.com/JoaoVictorMatos)
* **Lucas de Oliveira Pereira** - [GitHub Profile](https://github.com/lucaspereirap7)
* **Arthur Rafael Silva Nunes** - [GitHub Profile](https://github.com/ArthurSilvaN)

## Executar com Docker (recomendado)

Sobe tudo (Postgres + backend + frontend) com um comando:

```bash
docker compose up --build
```

- Frontend: <http://localhost:4200>
- API (backend): <http://127.0.0.1:8000/api/>

O banco **Postgres** roda como serviço e os dados persistem em volumes Docker
(`pgdata` para o banco, `media` para os PDFs enviados). No primeiro start, o
backend roda as migrações e popula os dados iniciais (`load.py`) automaticamente
— execuções seguintes preservam o que já existe.

Para parar:

```bash
docker compose down          # mantém os dados
docker compose down -v       # apaga também os volumes (banco e arquivos)
```

## Executar manualmente (sem Docker)

Cada projeto tem seu próprio README com instruções:

- Backend: [`projeto-gestao-tccs/README.md`](projeto-gestao-tccs/README.md) — usa SQLite por padrão.
- Frontend: [`tcc-frontend/README.md`](tcc-frontend/README.md).

## Banco de dados

O backend escolhe o banco por variáveis de ambiente:

- Sem variáveis `POSTGRES_*` definidas → **SQLite** (desenvolvimento local).
- Com `POSTGRES_DB` definida (caso do `docker compose`) → **Postgres**.
