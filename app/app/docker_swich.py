import os
import docker


def check_mode():
    client = docker.from_env()
    list_container = []
    for container in client.containers.list(all=True):
        list_container.append(container.name)
    if "video2pgm" in list_container:
        return {"message": "Inventos"}
    if "core" in list_container:
        return {"message": "Detector"}
    else:
        return {"message": "Verification"}


def swith_mode(mode):
    if mode == "Detector":
        os.system('docker-compose -f /data/ultra/docker/docker-compose.yml down')
        os.system('docker-compose -f /mnt/disk/applications/detector-compose/docker-compose.yaml up -d')
        os.system('docker-compose -f /mnt/disk/applications/hydra/docker-compose.yaml up -d')
        return {"message": "Detector"}
    if mode == "Inventos":
        os.system('docker-compose -f /mnt/disk/applications/hydra/docker-compose.yaml down')
        os.system('docker-compose -f /mnt/disk/applications/detector-compose/docker-compose.yaml down')
        os.system('docker-compose -f /data/ultra/docker/docker-compose.yml up -d')
        return {"message": "Inventos"}
    if mode == "Verification":
        os.system('docker-compose -f /mnt/disk/applications/detector-compose/docker-compose.yaml down')
        os.system('docker-compose -f /mnt/disk/applications/hydra/docker-compose.yaml down')
        os.system('docker-compose -f /data/ultra/docker/docker-compose.yml down')
        return {"message": "Verification"}


