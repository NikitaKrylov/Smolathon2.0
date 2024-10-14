import requests
import json
import time

from api.src.params import settings


class KadinskyAPI:
    BASE_URL = 'https://api-key.fusionbrain.ai/'
    AUTH_HEADERS = {
        'X-Key': settings.x_key,
        'X-Secret': settings.x_secret,
    }

    def __init__(self):
        pass

    def get_model(self):
        response = requests.get(f"{self.BASE_URL}key/api/v1/models", headers=self.AUTH_HEADERS)
        response.raise_for_status()
        data = response.json()
        return data[0]['id']

    def generate(self, model, prompt: str):
        if prompt == "":
            prompt = 'Абстрактный паттерн в стиле Айвазовского'
        params = {
            "type": "GENERATE",
            "style": "No style",
            "width": 512,
            "height": 512,
            "num_images": 1,
            "images": ["string"],
            "negativePromptUnclip": "реализм, мало объектов",
            "generateParams": {
                "query": prompt,
            }
        }
        
        data = {
            'model_id': (None, model),
            'params': (None, json.dumps(params), 'application/json')
        }
        response = requests.post(f"{self.BASE_URL}key/api/v1/text2image/run", headers=self.AUTH_HEADERS, files=data)
        response.raise_for_status()
        return response.json()['uuid']

    def check_generation(self, request_id, attempts=15, delay=10):
        for _ in range(attempts):
            response = requests.get(f"{self.BASE_URL}key/api/v1/text2image/status/{request_id}", headers=self.AUTH_HEADERS)
            response.raise_for_status()
            data = response.json()
            if data['status'] == 'DONE':
                return data['images']
            time.sleep(delay)
        return None