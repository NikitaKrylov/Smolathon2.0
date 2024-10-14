FROM python:3.11

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /api

COPY ./api/requirements.txt ./api/requirements.txt
RUN pip install -r ./api/requirements.txt
RUN pip uninstall langchain_core -y
RUN pip install -U langchain-community
RUN pip install gigachain-community -U

COPY . .

CMD ["uvicorn", "api.__main__:app", "--host", "0.0.0.0", "--port", "6969"]
