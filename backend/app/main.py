from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import search, upload, analyze
from app.routes import analyze_url
app = FastAPI(title="PaperLens AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search.router)
app.include_router(upload.router)
app.include_router(analyze.router)
app.include_router(analyze_url.router)

@app.get("/")
def root():
    return {"message": "PaperLens AI API running"}