import math
import os
import logging

# Safe imports for production deployment
# AI_AVAILABLE flag guards all machine learning logic
try:
    # Check environment variable to force disable AI
    if os.getenv("ENABLE_AI", "true").lower() == "false":
        raise ImportError("AI explicitly disabled via ENABLE_AI")
    from ultralytics import YOLO
    import cv2
    import cvzone
    AI_AVAILABLE = True
except ImportError:
    AI_AVAILABLE = False
    logging.warning("⚠️  AI libraries (ultralytics, opencv, cvzone) not found or disabled in detect_object_on_video. Mock mode active.")

def detect_object_on_video(video_path):
    # Enforce safe usage with AI_AVAILABLE guard
    if not AI_AVAILABLE:
        logging.info(f"Mocking video detection for path: {video_path}")
        while True:
            # Yield None to indicate mock state to the frame generator
            yield None 
            break
        return

    try:
        video_capture = video_path
        cap = cv2.VideoCapture(video_capture)
        
        model = YOLO('./models/yolov8n.pt')
        classNames = ["person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
                      "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
                      "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack", "umbrella",
                      "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball", "kite", "baseball bat",
                      "baseball glove", "skateboard", "surfboard", "tennis racket", "bottle", "wine glass", "cup",
                      "fork", "knife", "spoon", "bowl", "banana", "apple", "sandwich", "orange", "broccoli",
                      "carrot", "hot dog", "pizza", "donut", "cake", "chair", "sofa", "pottedplant", "bed",
                      "diningtable", "toilet", "tvmonitor", "laptop", "mouse", "remote", "keyboard", "cell phone",
                      "microwave", "oven", "toaster", "sink", "refrigerator", "book", "clock", "vase", "scissors",
                      "teddy bear", "hair drier", "toothbrush"
                      ]
        while True:
            sucess, img = cap.read()
            if not sucess:
                break
            results = model(img,stream=True)
            for r in results:
                boxes = r.boxes
                for box in boxes:
                    x1, y1, x2, y2 = box.xyxy[0]
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                    w, h = x2 - x1, y2 - y1

                    conf = math.ceil((box.conf[0] * 100)) / 100
                    cls = int(box.cls[0])
                    label = classNames[cls].upper()
                    cvzone.cornerRect(img, (x1, y1, w, h))
                    cvzone.putTextRect(img, f'{label} {conf}', (max(0, x1), max(35, y1)), colorR=(0,165,255))
            yield img
    except Exception as e:
        logging.error(f"Error in video detection: {str(e)}")
        yield None

if AI_AVAILABLE:
    try:
        cv2.destroyAllWindows()
    except:
        pass
