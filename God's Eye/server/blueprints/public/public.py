import json
from flask import Blueprint, Response, jsonify,request, current_app
from PIL import Image
import os
import json
from werkzeug.utils import secure_filename

# Handle heavy AI imports safely for production
try:
    from ultralytics import YOLO
    import cv2
    from modules.detect_object_on_video import detect_object_on_video
    HAS_AI_LIBS = True
except ImportError:
    HAS_AI_LIBS = False
    print("⚠️  Warning: Heavy AI libraries (ultralytics, opencv) not found. Using fallback/mock logic.")

# PUBLIC BLUEPRINT...
public_bp = Blueprint('public',__name__, url_prefix='/api/v1/public')

# DETECT OBJECT ON IMAGE
def detect_object_on_image(image_file):
    if not HAS_AI_LIBS:
        return [[10, 10, 100, 100, "mock_accident", 0.99]]
    
    # model = YOLO('./models/yolov8n.pt')
    model = YOLO('./models/i1-yolov8s.pt')
    results = model.predict(image_file)
    result = results[0]
    output = []
    for box in result.boxes:
        x1,y1,x2,y2 = [
            round(x) for x in box.xyxy[0].tolist()
        ]
        class_id = box.cls[0].item()
        prob = round(box.conf[0].item(),2)
        output.append([
            x1,y1,x2,y2,result.names[class_id],prob
        ])
    return output

# GENERATE FRAMES
def generate_frames(path_x = ''):
    if not HAS_AI_LIBS:
        # Mock frame for streaming if libraries are missing
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + b'mock_frame_data' + b'\r\n')
        return

    yolo_output = detect_object_on_video(path_x)
    for detection_ in yolo_output:
        ref,buffer=cv2.imencode('.jpg',detection_)

        frame=buffer.tobytes()
        yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame +b'\r\n')
        
# ROUTES FOR HOME...
@public_bp.route('/',methods=['GET'])
def return_home():
    return jsonify({
        "message": "Welcome to home api page.",
        "ai_enabled": HAS_AI_LIBS
    })

# MOCK DETECTION ENDPOINT
@public_bp.route('/detect', methods=['GET', 'POST'])
def mock_detect():
    return jsonify({
        "status": "success",
        "message": "Mock detection response",
        "detections": [
            {"box": [50, 50, 200, 200], "label": "accident", "confidence": 0.95},
            {"box": [300, 100, 450, 250], "label": "car", "confidence": 0.88}
        ],
        "ai_libs_available": HAS_AI_LIBS
    })

# ROUTES FOR APPLY MODEL...
@public_bp.route('/apply-model', methods=['POST'])
def detect_object():
    try:
        image_file = request.files['image']
        boxes = detect_object_on_image(Image.open(image_file.stream))
        return Response(
            json.dumps(boxes),
            mimetype='application/json'
        )
    except Exception as e:
        return jsonify({
            "status": 'error',
            'message': str(e)
        })

# ROUTES FOR UPLOAD VIDEO...
@public_bp.route('/upload-video', methods=['POST'])
def api_video():
    try:
        video_file = request.files['image']
        if not video_file:
            return jsonify({
                "status": "error",
                "message": "No video file provided"
            }), 400
        
        filename = secure_filename(video_file.filename)
        full_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        video_file.save(full_path)
        
        # Return the full path relative to static folder for video processing
        video_path = f"static/videos/{filename}"
        
        return jsonify({
            "status": "success",
            "path": video_path
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    
# ROUTES FOR SHOW VIDEO...
@public_bp.route('/show-video/static/videos/<path>', methods=['GET'])
def show_video(path):
    print('🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥')
    final_path = 'static/videos/' + path
    return Response(generate_frames(path_x=final_path), mimetype='multipart/x-mixed-replace; boundary=frame')  
    
# ROUTES FOR WEBCAM...
@public_bp.route('/webcam', methods=['GET'])
def api_webcam():
    return Response(generate_frames(path_x=0), mimetype='multipart/x-mixed-replace; boundary=frame')