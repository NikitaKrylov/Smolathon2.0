from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse


from .src.routers import v1_router

description = """
Сервис для взаимодействия с ML частью проекта. Разработано хакатона "Смолатон 2024" командой "МИСИС 52". 

## Описание ML сервиса
ML сервис предназначен для работы c ИИ для генерации изображений (с помощью модели kandinsky 3.1) и работы с ЛЛМ Агентом (На базе Gigachat)
"""

tags_metadata = [
    {
        "name": "v1",
        "description": "Все эндпоинты ML сервиса",
    }
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


def create_application():
    return FastAPI(
        title="ML API",
        description=description,
        version="1.0.1",
        responses={404: {"description": "Not Found!"}},
        default_response_class=ORJSONResponse,
        lifespan=lifespan,
        openapi_tags=tags_metadata,
        root_path="/ml"
    )

app = create_application()

origins = [
    'http://localhost',
    'http://localhost:8080',
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


def _configure():
    app.include_router(v1_router)

_configure()