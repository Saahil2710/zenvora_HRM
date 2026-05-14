from fastapi import FastAPI
from app.routers.ranking_router import router

app = FastAPI(
    title="Zenvora NeuroHR AI",
    description="Enterprise AI Candidate Ranking System",
    version="1.0.0"
)

app.include_router(router)


@app.get("/")
async def root():
    return {
        "message": "Zenvora NeuroHR AI Running Successfully"
    }