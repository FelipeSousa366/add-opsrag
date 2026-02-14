# ASSIST OPSRAG

## Visão Geral

O **ASSIST OPSRAG** é um sistema RAG (Retrieval-Augmented Generation) baseado em FastAPI e React, projetado para consultar documentação interna através de IA com respostas contextualizadas e rastreáveis.

---

## Stack Tecnológico

### Backend
- **Python** 3.11+
- **FastAPI** - Framework web
- **LangChain** - Pipeline RAG
- **OpenAI** - LLM e embeddings
- **ChromaDB** - Vector store

### Frontend
- **React** 18 com Vite
- **TailwindCSS** - Estilização
- **Lucide React** - Ícones

---

## Pré-requisitos

- Python 3.11 ou superior
- Node.js 18+ e npm
- Chave de API da OpenAI

---

## Instalação e Execução

### Backend

1. **Navegue até a pasta do backend:**
```bash
cd backend
```

2. **Instale as dependências:**
```bash
python -m pip install -r requirements.txt
```

3. **Configure as variáveis de ambiente:**

Copie o arquivo `.env.example` para `.env` e configure sua chave da OpenAI:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione sua chave:
```
OPENAI_API_KEY=sua-chave-aqui
OPENAI_MODEL=gpt-4
OPENAI_EMBEDDING_MODEL=text-embedding-3-large
CHROMA_PERSIST_DIR=app/data/index
RAW_MD_DIR=app/data/raw_md
```

4. **Execute o backend:**

**Windows:**
```bash
start_backend.bat
```

**Ou manualmente:**
```bash
set PYDANTIC_V1_COMPAT=1
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Linux/Mac:**
```bash
export PYDANTIC_V1_COMPAT=1
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

O backend estará disponível em: **http://localhost:8000**

---

### Frontend

1. **Navegue até a pasta do frontend:**
```bash
cd frontend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Execute o frontend:**

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

**Linux/Mac:**
```bash
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

---

## Uso

### 1. Ingestão de Documentos

Coloque seus arquivos `.md` na pasta `backend/app/data/raw_md/` e execute a ingestão:

- Acesse a aba **"Ingestão"** no frontend
- Clique em **"Iniciar Ingestão"**
- Aguarde o processamento dos documentos

### 2. Consultas

- Acesse a aba **"Assistente"**
- Digite sua pergunta sobre a documentação
- Receba respostas contextualizadas com fontes

### 3. Dashboard

- Acesse a aba **"Dashboard"**
- Visualize estatísticas sobre documentos e consultas

---

## Arquivos de Exemplo

O projeto inclui 10 arquivos markdown de exemplo na pasta `mdexamples/` simulando documentação de uma empresa fictícia (TechNova Solutions):

- Política de Segurança
- Onboarding de Colaboradores
- Processos de TI
- Desenvolvimento de Software
- Política de Férias
- Produtos e Serviços
- Compliance e Ética
- Arquitetura de Sistemas
- Procedimentos de Vendas
- Suporte ao Cliente

Para usar os exemplos, copie os arquivos para `backend/app/data/raw_md/` e execute a ingestão.

---

## Endpoints da API

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/health` | GET | Health check |
| `/ingest` | POST | Ingestão de documentos |
| `/ask` | POST | Consulta ao RAG |
| `/stats` | GET | Estatísticas |

---

## Estrutura do Projeto

```
add_opsrag/
├── backend/
│   ├── app/
│   │   ├── api/          # Rotas HTTP
│   │   ├── core/         # Configurações
│   │   ├── rag/          # Pipeline RAG
│   │   ├── data/         # Dados e índices
│   │   └── main.py       # Aplicação principal
│   ├── requirements.txt
│   ├── start_backend.bat
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/   # Componentes React
│   │   ├── context/      # Context API
│   │   ├── api.js        # Cliente API
│   │   └── main.jsx      # Entry point
│   ├── package.json
│   └── vite.config.js
└── mdexamples/           # Documentos de exemplo
```

---

## Troubleshooting

### Erro: "No module named 'app'"

Certifique-se de estar executando o uvicorn a partir da pasta `backend/`:
```bash
cd backend
python -m uvicorn app.main:app --reload
```

### Erro: Pydantic V1 incompatível com Python 3.14

Use Python 3.11 ou 3.12, ou defina a variável de ambiente:
```bash
set PYDANTIC_V1_COMPAT=1  # Windows
export PYDANTIC_V1_COMPAT=1  # Linux/Mac
```

### Erro: "npm não pode ser carregado" (Windows)

Execute com bypass de política:
```powershell
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

### Frontend não conecta ao backend

Verifique se:
1. O backend está rodando em `http://localhost:8000`
2. O proxy está configurado em `frontend/vite.config.js`
3. Ambos os servidores estão ativos

---

## Licença

MIT

---

## Contato

Para dúvidas ou sugestões sobre o projeto, abra uma issue no repositório.

---

*Última atualização: Fevereiro 2026*
