from datetime import datetime
from pydantic import BaseModel, Field, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str


class UserOut(BaseModel):
    id: int
    login: str
    full_name: str
    age: int
    user_type: str
    created_at: datetime


class UserOutWithHashedPassword(UserOut):
    password: str


class UserCreate(BaseModel):
    login: EmailStr = Field(title='Это логин, но это почта')
    full_name: str
    age: int = Field(gt=0)
    password: str
    user_type: str

