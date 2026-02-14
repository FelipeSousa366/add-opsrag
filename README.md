# ASSIST OPS-RAG (add-opsrag)

![License](https://img.shields.io/badge/License-MIT-green.svg)
![Python](https://img.shields.io/badge/Python-3.11%2B-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688.svg?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=000)

**ASSIST OPS-RAG** é um assistente de documentação baseado em **RAG (Retrieval-Augmented Generation)**: você indexa arquivos **Markdown** e consulta esse conhecimento via chat, recebendo respostas contextualizadas e acompanhadas de **fontes**.

> Objetivo: centralizar conhecimento operacional/documentação (processos, runbooks, políticas, onboarding, etc.) e tornar a consulta mais rápida e rastreável.

---

## O que você encontra aqui

- **Ingestão de Markdown**: lê `.md`, faz chunking e gera embeddings.
- **Base vetorial local (ChromaDB)** com persistência em disco.
- **Chat com histórico** (o frontend envia o histórico recente junto da pergunta).
- **Dashboard** com status, contagem de documentos/chunks e lista de arquivos indexados.
- **Remoção de documento do índice** (remove do “memory” do RAG sem necessariamente apagar o arquivo do disco).

---

## Como funciona (visão rápida)

1. Você coloca seus `.md` em `backend/app/data/raw_md/`.
2. A ingestão divide o conteúdo em chunks e salva embeddings no Chroma.
3. Ao perguntar, o backend recupera os trechos mais relevantes (top-k) e envia **contexto + pergunta** para o modelo.
4. A resposta volta com uma lista de **sources** para rastreabilidade.

---

## Stack

**Backend**
- Python 3.11+
- FastAPI + Uvicorn
- LangChain (pipeline RAG)
- ChromaDB (vector store)
- OpenAI (LLM + embeddings)

**Frontend**
- React 18 (Vite)
- TailwindCSS
- Lucide React

---

## Pré-requisitos

- **Python 3.11+**
- **Node.js 18+** (npm)
- **Chave de API da OpenAI**

---

## Quickstart (desenvolvimento local)

### 1) Clone o repositório
```bash
git clone https://github.com/FelipeSousa366/add-opsrag.git
cd add-opsrag
````

### 2) Backend (FastAPI)

```bash
cd backend
python -m venv venv
```

Ative o ambiente virtual:

**Windows (cmd)**

```bat
venv\Scripts\activate
```

**Linux/Mac**

```bash
source venv/bin/activate
```

Instale as dependências:

```bash
python -m pip install -r requirements.txt
```

Crie o arquivo de ambiente:

```bash
cp .env.example .env
```

Edite o `.env` com sua chave:

```env
OPENAI_API_KEY=coloque_sua_chave_aqui
OPENAI_MODEL=gpt-4.1
OPENAI_EMBEDDING_MODEL=text-embedding-3-large

CHROMA_PERSIST_DIR=app/data/index
RAW_MD_DIR=app/data/raw_md
```

Suba o servidor:

**Windows (script pronto)**

```bat
start_backend.bat
```

**Manual (qualquer SO)**

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend:

* API: `http://localhost:8000`
* Docs (Swagger): `http://localhost:8000/docs`

---

### 3) Frontend (React + Vite)

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

* `http://localhost:3000`

> Em desenvolvimento, o Vite já faz **proxy** de `/api` → `http://localhost:8000`.

---

## Usando o sistema

### 1) Adicione seus documentos

Coloque arquivos `.md` em:

```
backend/app/data/raw_md/
```

### 2) Faça a ingestão

Pelo frontend, na aba **Ingestão**, clique em **Iniciar Ingestão**.

### 3) Pergunte no chat

Na aba **Assistente**, faça perguntas sobre o conteúdo indexado.
As respostas trazem uma lista de fontes (arquivos) usadas no contexto.

### 4) Acompanhe no Dashboard

A aba **Dashboard** mostra:

* Status do serviço
* Quantidade de documentos
* Quantidade de chunks indexados
* Lista de arquivos (com opção de remover do índice)

---

## Endpoints da API

| Endpoint                | Método | Descrição                                             |
| ----------------------- | -----: | ----------------------------------------------------- |
| `/health`               |    GET | Health check                                          |
| `/ingest`               |   POST | Processa os `.md` e persiste o índice vetorial        |
| `/ask`                  |   POST | Consulta ao RAG (retorna resposta + sources)          |
| `/stats`                |    GET | Estatísticas (documentos, chunks e lista de arquivos) |
| `/documents/{filename}` | DELETE | Remove do índice os chunks do arquivo                 |

### Exemplo: pergunta (`/ask`)

```bash
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Como funciona a ingestão?",
    "history": [
      { "role": "user", "content": "Olá!" },
      { "role": "assistant", "content": "Oi! Como posso ajudar?" }
    ]
  }'
```

---

## Documentos de exemplo

A pasta `mdexamples/` contém arquivos de exemplo (Markdown) para testar a ingestão e o chat.

Sugestão de uso:

1. Copie os `.md` de `mdexamples/` para `backend/app/data/raw_md/`
2. Execute a ingestão
3. Faça perguntas no chat

---

## Estrutura do repositório

```
add-opsrag/
├── backend/
│   ├── app/
│   │   ├── api/               # Rotas HTTP
│   │   ├── core/              # Configurações (.env)
│   │   ├── rag/               # Ingestão, retriever e prompt
│   │   ├── data/
│   │   │   ├── raw_md/        # Documentos Markdown (entrada)
│   │   │   └── index/         # Índice vetorial (persistência)
│   │   └── main.py            # App FastAPI
│   ├── requirements.txt
│   ├── start_backend.bat
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── mdexamples/
```

---

## Ajustes comuns (customização)

* **Chunking**: `backend/app/rag/ingest.py` (tamanho e overlap)
* **Quantidade de contexto (top-k)**: `backend/app/rag/retriever.py`
* **Prompt do assistente**: `backend/app/rag/prompt.py`
* **Modelos**: via `.env` (`OPENAI_MODEL`, `OPENAI_EMBEDDING_MODEL`)

---

## Licença

Distribuído sob licença **MIT**.

---


