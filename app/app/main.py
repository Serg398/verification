import json

import uvicorn as uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from photos import create_photo, get_list_photo, remove_list, get_status
from docker_swich import check_mode, swith_mode


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/photos")
async def get_photos():
    list_photo = get_list_photo()
    return sorted(list_photo, key=lambda x: x['name'])


@app.get("/api/remove")
async def remove():
    remove_list()
    return {"message": "Файлы удалены"}


@app.get("/api/download/{name}")
async def upload(name):
    return FileResponse(f"/photos/{name}")


@app.get("/api/create")
async def new_photo():
    return create_photo()


@app.get("/api/status")
async def status():
    return {"message": get_status()}

@app.get("/api/mode")
async def get_status_mode():
    return check_mode()


@app.post("/api/mode")
async def post_status_mode(request: Request):
    body = await request.body()
    obj = json.loads(body)
    print(obj['message'])
    return swith_mode(obj['message'])


if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)