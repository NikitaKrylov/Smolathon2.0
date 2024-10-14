from pydantic import BaseModel


class PostTagCreate(BaseModel):
    name: str


class PostTagOut(PostTagCreate):
    id: int
    post_id: int
