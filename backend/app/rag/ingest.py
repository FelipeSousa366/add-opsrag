import os
import time
import threading
import logging
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from app.core.config import settings

logger = logging.getLogger("ingest")
logger.setLevel(logging.INFO)
if not logger.handlers:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s"
    )

def _heartbeat(stop_event, interval=5):
    start = time.perf_counter()
    while not stop_event.is_set():
        elapsed = time.perf_counter() - start
        logger.info(f"[INGEST] Em andamento... {elapsed:.1f}s")
        stop_event.wait(interval)

def ingest_markdown_folder():
    t0 = time.perf_counter()
    logger.info("[INGEST] Iniciando ingestão")

    md_dir = settings.raw_md_dir
    if not os.path.isdir(md_dir):
        raise FileNotFoundError(f"Pasta não encontrada: {md_dir}")

    stop_event = threading.Event()
    hb_thread = threading.Thread(target=_heartbeat, args=(stop_event,), daemon=True)
    hb_thread.start()

    try:
        files = [f for f in os.listdir(md_dir) if f.endswith(".md")]
        logger.info(f"[INGEST] Arquivos .md encontrados: {len(files)}")

        docs = []
        for i, file in enumerate(files, start=1):
            path = os.path.join(md_dir, file)
            logger.info(f"[INGEST] Carregando ({i}/{len(files)}): {file}")
            loader = TextLoader(path, encoding="utf-8")
            docs.extend(loader.load())

        logger.info(f"[INGEST] Documentos carregados: {len(docs)}")

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        chunks = splitter.split_documents(docs)
        logger.info(f"[INGEST] Chunks gerados: {len(chunks)}")

        embeddings = OpenAIEmbeddings(
            model=settings.openai_embedding_model,
            api_key=settings.openai_api_key
        )
        logger.info(f"[INGEST] Embeddings carregados: {settings.openai_embedding_model}")

        vectorstore = Chroma.from_documents(
            documents=chunks,
            embedding=embeddings,
            persist_directory=settings.chroma_persist_dir
        )
        vectorstore.persist()
        logger.info(f"[INGEST] Índice persistido em: {settings.chroma_persist_dir}")

        elapsed = time.perf_counter() - t0
        logger.info(f"[INGEST] Finalizado em {elapsed:.2f}s")

        return {
            "files": len(files),
            "chunks": len(chunks),
            "elapsed_seconds": round(elapsed, 2)
        }

    finally:
        stop_event.set()