from fastapi import APIRouter
from app.services.semantic_service import search_papers

router = APIRouter()

@router.get("/search")
def search(query: str):
    return search_papers(query)