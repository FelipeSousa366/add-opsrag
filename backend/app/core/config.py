from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    openai_api_key: str
    openai_model: str = "gpt-5.2"
    openai_embedding_model: str = "text-embedding-3-large"
    chroma_persist_dir: str = "app/data/index"
    raw_md_dir: str = "app/data/raw_md"

    class Config:
        env_file = ".env"

settings = Settings()