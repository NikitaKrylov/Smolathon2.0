from pathlib import Path
from fastapi import UploadFile, HTTPException
from starlette import status
from src.database.db import async_session
from src.database.models import Post, File, PostTag
from src.schemas.posts import PostCreate, PostOut, PostChange, FileCreate, FileOut
from src.database import base_db, posts
from src.schemas.tags import PostTagOut, PostTagCreate


async def create_post(post: PostCreate, user_id: int):
    async with async_session() as session:
        return await base_db.create_one(session, Post, post, PostOut, author_id=user_id)


async def get_post_list():
    async with async_session() as session:
        return await base_db.get_all(session, Post, PostOut)


async def get_posts_with_files_list():
    async with async_session() as session:
        return await posts.get_extended_posts_list(session)


async def delete_posts(ids: list[int]) -> None:
    async with async_session() as session:
        await base_db.delete_by_ids(session, Post, ids)


async def change_post(post_id: int, data: PostChange):
    async with async_session() as session:
        await base_db.update_by_id(session, Post, post_id, data)


async def add_file_to_post(post_id: int, file: UploadFile) -> FileOut:
    async with async_session() as session:
        target_post = await base_db.get_one_or_none_by_id(session, Post, post_id, PostOut)
        if not target_post:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f'Публикации с id - {post_id} не найдено.')

        file_path = await download_file(file)

        file_data = FileCreate(post_id=post_id, storage_path=file_path)
        return await base_db.create_one(session, File, file_data, FileOut)


async def remove_file_from_post(file_id: int):
    async with async_session() as session:
        file_data = await base_db.get_one_or_none_by_id(session, File, file_id, FileOut)
        if not file_data:
            raise HTTPException(status.HTTP_404_NOT_FOUND, f'Файл с id - {file_id} не найден.')

        await base_db.delete_by_id(session, File, file_id)
        delete_file(file_data.storage_path)


async def download_file(file: UploadFile):
    content = await file.read()
    path = f'media/{file.filename}'
    with open(path, "wb") as f:
        f.write(content)

    return path


def delete_file(file_path: str):
    path = Path(file_path)
    if not path.exists():
        raise HTTPException(status.HTTP_404_NOT_FOUND, f'Ошибка удаления, файл {path} не найден.')
    path.unlink()


async def add_post_tags(post_id: int, data: list[PostTagCreate]):
    async with async_session() as session:
        await base_db.create_all(session, PostTag, data, post_id=post_id)

