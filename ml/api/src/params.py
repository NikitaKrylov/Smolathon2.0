from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    x_key: str
    x_secret: str
    client_id: str
    secret: str


settings = Settings(_env_file_encoding='utf-8')