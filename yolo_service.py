import base64
import io
import os

from fastapi import FastAPI, HTTPException
from PIL import Image
from pydantic import BaseModel
from ultralytics import YOLO

MODEL_PATH = os.getenv("YOLO_MODEL", "models/best.pt")
app = FastAPI()
model = YOLO(MODEL_PATH)


class ImageRequest(BaseModel):
    image: str


@app.post("/detect")
def detect(request: ImageRequest):
    if "," not in request.image:
        raise HTTPException(status_code=400, detail="รูปแบบภาพไม่ถูกต้อง")

    try:
        image = Image.open(io.BytesIO(base64.b64decode(request.image.split(",", 1)[1]))).convert("RGB")
    except Exception as error:
        raise HTTPException(status_code=400, detail=f"อ่านภาพไม่ได้: {error}") from error

    results = model(image, conf=0.5, verbose=False)
    detections = []
    for result in results:
        for box in result.boxes:
            class_id = int(box.cls[0])
            detections.append({
                "label": model.names[class_id],
                "confidence": round(float(box.conf[0]), 3),
                "box": [round(float(value), 1) for value in box.xyxy[0].tolist()]
            })

    detections.sort(key=lambda item: item["confidence"], reverse=True)
    top = detections[0] if detections else None

    known = {"PET", "HDPE", "PVC", "LDPE", "PP", "PS"}
    top_type = top["label"].upper().replace("-", "").replace("_", "") if top else None
    top_type = top_type if top_type in known else None

    return {
        "is_plastic": top_type is not None,
        "type": top_type,
        "label": top["label"] if top else None,
        "confidence": top["confidence"] if top else 0,
        "detections": detections,
    }
