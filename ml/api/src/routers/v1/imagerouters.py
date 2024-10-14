import io
import json
import time

import requests

from fastapi import APIRouter, File
from starlette.responses import Response

from api.src.schemas import schemas
from api.src.services.imageservice import KadinskyAPI


ml_router = APIRouter(
    tags=['Images Service'],
    prefix='/images'
)


@ml_router.post("/generate")
def generate_image(ImagePrompt: schemas.ImagePrompt):
    api = KadinskyAPI()
    model_id = api.get_model()
    request_uuid = api.generate(model_id, prompt=ImagePrompt.text)
    images = api.check_generation(request_uuid)
    if images is None:
        return {"error": "Image generation failed"}
    return {"images": images}