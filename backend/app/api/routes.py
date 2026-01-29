from fastapi import APIRouter
from pydantic import BaseModel
from langchain_openai import ChatOpenAI
from app.core.config import settings
from app.rag.retriever import get_retriever
from app.rag.prompt import SYSTEM_PROMPT
from app.rag.ingest import ingest_markdown_folder

router = APIRouter()

class AskRequest(BaseModel):
    question: str

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

    prompt = f"""{SYSTEM_PROMPT}

Contexto:
{context}

Pergunta:
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