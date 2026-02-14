@echo off
set PYDANTIC_V1_COMPAT=1
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
