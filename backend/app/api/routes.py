from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional
from langchain_openai import ChatOpenAI
from app.core.config import settings
from app.rag.retriever import get_retriever
from app.rag.prompt import SYSTEM_PROMPT
from app.rag.ingest import ingest_markdown_folder

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class AskRequest(BaseModel):
    question: str
    history: Optional[List[Message]] = []

@router.post("/ask")
def ask(req: AskRequest):
    retriever = get_retriever()
    docs = retriever.invoke(req.question)

    context = "\n\n".join([d.page_content for d in docs])

    llm = ChatOpenAI(
        model=settings.openai_model,
        api_key=settings.openai_api_key,
        temperature=0.2
    )

    history_text = ""
    if req.history:
        recent_history = req.history[-10:]
        history_lines = []
        for msg in recent_history:
            role_label = "Usuário" if msg.role == "user" else "Assistente"
            history_lines.append(f"{role_label}: {msg.content}")
        history_text = "\n".join(history_lines)

    prompt = f"""{SYSTEM_PROMPT}

Contexto dos documentos:
{context}

{"Histórico da conversa:" + chr(10) + history_text + chr(10) if history_text else ""}
Pergunta atual:
{req.question}
"""

    response = llm.invoke(prompt)

    return {
        "answer": response.content,
        "sources": [d.metadata.get("source") for d in docs]
    }

@router.post("/ingest")
def ingest():
    result = ingest_markdown_folder()
    return {"status": "ok", **result}

@router.get("/stats")
def stats():
    import os
    from langchain_community.vectorstores import Chroma
    from langchain_openai import OpenAIEmbeddings
    
    md_dir = settings.raw_md_dir
    files = []
    if os.path.isdir(md_dir):
        files = [f for f in os.listdir(md_dir) if f.endswith(".md")]
    
    chunks_count = 0
    try:
        embeddings = OpenAIEmbeddings(
            model=settings.openai_embedding_model,
            api_key=settings.openai_api_key
        )
        vectorstore = Chroma(
            persist_directory=settings.chroma_persist_dir,
            embedding_function=embeddings
        )
        chunks_count = vectorstore._collection.count()
    except:
        pass
    
    return {
        "documents": len(files),
        "chunks": chunks_count,
        "files": files
    }