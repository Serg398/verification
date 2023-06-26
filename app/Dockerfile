FROM python:3.10.0-slim-buster

ENV PYTHONUNBUFFERED=1

COPY requirements.txt .

RUN apt update && apt install -y ffmpeg libsm6 libxext6 libgl1-mesa-glx

RUN python3 -m pip install --upgrade pip
RUN  pip3 install -r requirements.txt
RUN  pip3 install docker-compose

COPY ./app /app

WORKDIR /app

CMD ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]