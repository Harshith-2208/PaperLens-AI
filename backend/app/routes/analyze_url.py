from fastapi import APIRouter
import requests
import os
from app.services.pdf_service import extract_text
from app.services.ai_service import analyze_text
from app.config import UPLOAD_DIR

router = APIRouter()

@router.post("/analyze-url")
def analyze_from_url(pdf_url: str):

    filename = "temp_paper.pdf"
    path = os.path.join(UPLOAD_DIR, filename)

    # download pdf
    response = requests.get(pdf_url)

    with open(path, "wb") as f:
        f.write(response.content)

    text = extract_text(path)

    result = analyze_text(text)

    return result