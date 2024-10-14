from fastapi import FastAPI
import uvicorn
from starlette.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from src.routers.users import router as users_router
from src.routers.posts import router as posts_router
from src.params.config import config


app = FastAPI(root_path='/api' if config.is_prod else '')

app.mount("/media", StaticFiles(directory="media"), name="media")

origins = [
    'http://localhost',
    'http://localhost:8080',
    'http://localhost:3000',
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

app.include_router(users_router)
app.include_router(posts_router)

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
