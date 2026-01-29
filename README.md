# ADD_OPSRAG

## Visão geral

O **ADD_OPSRAG** é um backend corporativo baseado em **RAG (Retrieval-Augmented Generation)**, desenhado para centralizar documentação interna e conhecimento operacional. A solução permite que equipes consultem processos, ferramentas e fluxos de trabalho específicos da empresa por meio de LLMs, com respostas contextualizadas e rastreáveis.

**Proposta de valor:** reduzir tempo de busca por informação, padronizar respostas internas e acelerar tomada de decisão com base em documentação confiável.

---

## Por que esse projeto importa

Empresas com grande volume de processos enfrentam desafios recorrentes:

- dispersão de conhecimento em múltiplos repositórios;
- retrabalho em suporte interno;
- onboarding lento de novas pessoas;
- dificuldade em manter a documentação como “fonte única da verdade”.

O **ADD_OPSRAG** resolve esse problema com uma camada de IA que consulta **documentos internos** e devolve respostas claras **com evidência de origem**.

---

## Funcionalidades principais

- **Ingestão de documentação Markdown** com pipeline automatizado.
- **Indexação vetorial com ChromaDB** para busca semântica.
- **API de consulta (`/ask`)** com resposta contextualizada e **fontes**.
- **Configuração via `.env`** para troca rápida de modelos e storage.
- **Arquitetura modular** (API, core, RAG) pronta para expansão.

---

## Arquitetura (alto nível)

1. **Ingestão** de documentos `.md`.
2. **Chunking** e criação de embeddings.
3. **Persistência** em vector store.
4. **Consulta** via API com recuperação + geração.

---

## Stack

- **FastAPI** (API backend)
- **LangChain** (pipeline RAG)
- **OpenAI** (LLM + embeddings)
- **ChromaDB** (vector store)
- **Python**

---

## Estrutura do projeto

```text
backend/
  app/
    api/           # Rotas HTTP
    core/          # Configurações
    rag/           # Ingestão, retriever e prompt
    main.py        # Inicialização da API
  scripts/
  .env.example
  requirements.txt
```

---

## Endpoints

- `GET /health` — health check da API
- `POST /ingest` — ingestão de documentos Markdown
- `POST /ask` — consulta com recuperação de contexto

---

## Execução local

### 1) Ambiente

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

### 2) Configuração (`.env`)

Ajuste as variáveis conforme sua infraestrutura:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `OPENAI_EMBEDDING_MODEL`
- `CHROMA_PERSIST_DIR`
- `RAW_MD_DIR`

### 3) Subir API

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4) Ingestão

Coloque os arquivos `.md` em `app/data/raw_md` e rode:

```bash
curl -X POST http://localhost:8000/ingest
```

---

## Exemplo de consulta

```bash
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Como funciona o processo de abertura de chamado?"}'
```

**Resposta**

```json
{
  "answer": "...",
  "sources": [
    "app/data/raw_md/procedimentos.md",
    "app/data/raw_md/operacoes.md"
  ]
}
```

---

## Diferenciais corporativos

- **Centralização do conhecimento operacional** em uma única camada inteligente.
- **Rastreabilidade** das respostas com fontes internas.
- **Redução de tempo de atendimento** em suporte interno e operações.
- **Acelerador de onboarding** para novos colaboradores.
- **Base sólida para expansão** (auth, observabilidade, RBAC).

---

## Próximos passos sugeridos

- Autenticação e autorização (RBAC).
- Observabilidade (logs estruturados, métricas e tracing).
- Versionamento e auditoria de documentos.
- UI interna para consulta e feedback.

---

## Licença

MIT

---

## Repositório

[GitHub](https://github.com/FelipeSousa366/add-opsrag)
