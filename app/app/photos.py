import cv2
import datetime
import os
import configparser


config = configparser.ConfigParser()
config.read("settings.ini")


def get_list_photo():
    return_list_photo = []
    photo_dir = "/photos"
    with os.scandir(photo_dir) as files:
        for file in files:
            return_list_photo.append({"name": file.name})
    return return_list_photo


def create_photo():
    if len(get_list_photo()) != 2:
        cap = cv2.VideoCapture(0)
        if cap.isOpened() == False:
            return {"message": "Камера занята другим процессом"}
        else:
            print("Camera connect")
            cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
            cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
            ret, frame = cap.read()
            now = datetime.datetime.now()
            time_str = now.strftime("%Y-%m-%d_%H:%M:%S.%f")[:-3]
            cv2.putText(frame, time_str, (100, 80), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 255), 6, cv2.LINE_AA)
            cv2.putText(frame, f"{config['Configuration']['serial_number']}", (1400, 80), cv2.FONT_HERSHEY_SIMPLEX, 2, (0, 255, 255), 6, cv2.LINE_AA)
            cv2.imwrite(f'/photos/{time_str}.jpg', frame)
            cap.release()
            return {"message": "Сделан новый кадр"}
    if len(get_list_photo()) == 2:
        return {"message": "Не возможно сделать более 2 кадров"}


def remove_list():
    photo_dir = "/photos"
    with os.scandir(photo_dir) as files:
        for file in files:
            os.remove(file.path)


def get_status():
    list_photo = get_list_photo()
    if len(list_photo) == 2:
        start_time_photo = list_photo[0]['name'][:-4]
        end_time_photo = list_photo[1]['name'][:-4]
        delta = datetime.datetime.strptime(end_time_photo, '%Y-%m-%d_%H:%M:%S.%f') - datetime.datetime.strptime(start_time_photo, '%Y-%m-%d_%H:%M:%S.%f')
        return abs(delta)
    else:
        return ""





