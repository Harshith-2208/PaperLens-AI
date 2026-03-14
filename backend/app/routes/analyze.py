from fastapi import APIRouter, Query
import os
from app.services.pdf_service import extract_text
from app.services.ai_service import analyze_text
from app.config import UPLOAD_DIR

router = APIRouter()

@router.post("/analyze")
def analyze(filename: str):

    path = os.path.join(UPLOAD_DIR, filename)

    print("Received filename:", filename)
    print("Checking path:", path)

    if not os.path.exists(path):
        return {"error": f"File not found: {path}"}

    text = extract_text(path)

    result = analyze_text(text)

    return result