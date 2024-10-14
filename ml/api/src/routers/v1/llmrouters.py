import io
import json
import time

import requests

from fastapi import APIRouter, File, Depends, Query, status, HTTPException
from starlette.responses import Response

from api.src.schemas import schemas
from api.src.services.imageservice import KadinskyAPI
from api.src.configurations.user_model import get_user_session
from api.src.services.llmservice import AIvasovskiyLLM

llm_router = APIRouter(
    tags=['LLM Service'],
    prefix='/llm'
)


@llm_router.post('/initializechat', status_code=status.HTTP_200_OK)
def generate_image(user_id: str = Query(...), user_session=Depends(get_user_session)):
    user_session['llm_service'] = AIvasovskiyLLM()
    
    return {"message": "You can chat with AIvazovsky now!"}


@llm_router.post('/chat', status_code=status.HTTP_200_OK)
def generate_image(LLMPrompt: schemas.LLMPrompt, user_id: str = Query(...), user_session=Depends(get_user_session)):
    llm_service = user_session.get('llm_service')
    if llm_service == None:
        raise HTTPException(status_code=400, detail="First Initialize a chat!")
    
    output = llm_service.generate(LLMPrompt.text)
    
    return {"message": output}