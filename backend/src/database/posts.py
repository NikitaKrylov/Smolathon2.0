from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload, joinedload

from src.database.models import Post
from src.schemas.posts import PostOut, PostOutExtended


async def get_extended_posts_list(session: AsyncSession) -> list[PostOut]:
    query = (
        select(Post)
        .options(
            selectinload(Post.files),
            joinedload(Post.author),
            selectinload(Post.tags)
        )
    )
    result = (await session.execute(query)).scalars()

    return [PostOutExtended.model_validate(i, from_attributes=True) for i in result]

