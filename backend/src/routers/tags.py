from fastapi import APIRouter
from src.schemas.tags import PostTagOut
from src.services import tags as service

router = APIRouter(
    prefix="/tags",
    tags=['Теги']
)


@router.get('', response_model=list[PostTagOut])
async def get_all_tags():
    return await service.get_all_tags()

