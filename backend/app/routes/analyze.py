from fastapi import APIRouter
from app.services.pdf_service import extract_text
from app.services.ai_service import analyze_text
from app.config import UPLOAD_DIR
import os

router = APIRouter()

@router.post("/analyze")
def analyze(filename: str):

    path = os.path.join(UPLOAD_DIR, filename)

    text = extract_text(path)

    result = analyze_text(text)

    return result