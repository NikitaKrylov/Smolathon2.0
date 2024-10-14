from datetime import datetime
from pydantic import BaseModel, Field, computed_field

from src.schemas.tags import PostTagOut
from src.schemas.users import UserOut


class FileCreate(BaseModel):
    storage_path: str
    post_id: int


class FileOut(FileCreate):
    id: int


class PostCreate(BaseModel):
    title: str
    description: str


class PostOut(BaseModel):
    id: int
    author_id: int
    title: str
    description: str
    created_at: datetime


class PostOutExtended(PostOut):
    files: list[FileOut] = Field(default_factory=list)
    tags: list[PostTagOut] = Field(default_factory=list, exclude=True)
    author: UserOut

    @computed_field()
    @property
    def post_tags(self) -> list[str]:
        return [i.name for i in self.tags]

class PostChange(BaseModel):
    title: str
    description: str
