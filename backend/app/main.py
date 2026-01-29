import logging
from fastapi import FastAPI
from app.api.routes import router

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s"
)
logging.getLogger("ingest").propagate = True

app = FastAPI(title="ADD OPSRAG API")
app.include_router(router)

@app.get("/health")
def health():
    return {"status": "ok"}