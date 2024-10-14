from pydantic import BaseModel
from datetime import date
from typing import Optional

class ImagePrompt(BaseModel):
    text: str
    
    
class LLMPrompt(BaseModel):
    text: str