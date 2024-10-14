from fastapi import APIRouter, Body, UploadFile, File, Depends
from src.schemas.posts import PostOut, PostChange, PostCreate, PostOutExtended, FileOut
from src.schemas.tags import PostTagCreate
from src.schemas.users import UserOut
from src.services import posts as service
from src.services.users import get_current_user

router = APIRouter(
    prefix="/posts",
    tags=["Публикации"],
)


@router.get('', response_model=list[PostOutExtended])
async def get_posts_list():
    return await service.get_posts_with_files_list()


@router.post('', response_model=PostOut)
async def create_post(data: PostCreate, current_user: UserOut = Depends(get_current_user)):
    return await service.create_post(data, current_user.id)


@router.patch('/{post_id}')
async def change_post(post_id: int, data: PostChange):
    await service.change_post(post_id, data)


@router.delete('')
async def delete_post(post_ids: list[int] = Body(embed=True)):
    await service.delete_posts(post_ids)


@router.post('/{post_id}/files', response_model=FileOut)
async def add_file_to_post(post_id: int, file: UploadFile = File()):
    return await service.add_file_to_post(post_id, file)


@router.delete('/{post_id}/files/{file_id}')
async def remove_file_from_post(post_id: int, file_id: int):
    await service.remove_file_from_post(file_id)


@router.put('/{post_id}/tags')
async def add_post_tags(post_id: int, data: list[PostTagCreate]):
    await service.add_post_tags(post_id=post_id, data=data)


