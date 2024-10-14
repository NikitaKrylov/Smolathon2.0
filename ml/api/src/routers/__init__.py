from fastapi import APIRouter

from api.src.routers.v1.imagerouters import ml_router
from api.src.routers.v1.llmrouters import llm_router


# v1_router = APIRouter(tags=["v1"], prefix="/api/v1/ml")
v1_router = APIRouter(tags=["v1"], prefix="/v1/ml")

v1_router.include_router(ml_router)
v1_router.include_router(llm_router)


@v1_router.get("/")
async def root():
    return {'message': 'Hello world!'}
