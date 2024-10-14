from datetime import datetime

from sqlalchemy import func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.database.db import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    login: Mapped[str] = mapped_column(unique=True, index=True)
    user_type: Mapped[str] = mapped_column(default='Исследователь')
    full_name: Mapped[str]
    age: Mapped[int]
    password: Mapped[str]

    created_at: Mapped[datetime] = mapped_column(default=datetime.now(), server_default=func.now())


class File(Base):
    __tablename__ = "files"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    storage_path: Mapped[str]
    post_id: Mapped[int] = mapped_column(ForeignKey('posts.id', ondelete='CASCADE'), index=True)


class PostTag(Base):
    __tablename__ = "post_tags"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(index=True)
    post_id: Mapped[int | None] = mapped_column(ForeignKey('posts.id', ondelete='SET NULL'), nullable=True)


class Post(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    author_id: Mapped[int] = mapped_column(ForeignKey('users.id', ondelete='CASCADE'))
    author: Mapped[User] = relationship(uselist=False)

    title: Mapped[str]
    description: Mapped[str]
    files: Mapped[list['File']] = relationship(uselist=True)
    tags: Mapped[list['PostTag']] = relationship(uselist=True)
    created_at: Mapped[datetime] = mapped_column(default=datetime.now(), server_default=func.now())




