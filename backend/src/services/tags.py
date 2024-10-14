from src.database.db import async_session
from src.database import base_db
from src.database.models import PostTag
from src.schemas.tags import PostTagOut


async def get_all_tags():
    async with async_session() as session:
        return await base_db.get_all(session, PostTag, PostTagOut)