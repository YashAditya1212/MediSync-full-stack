import os
import json
import logging
from flask import Blueprint, Response, jsonify, request, current_app
from PIL import Image
from werkzeug.utils import secure_filename

# Handle heavy AI imports safely for production
# AI_AVAILABLE flag guards all machine learning logic
try:
    # Check environment variable to force disable AI
    if os.getenv("ENABLE_AI", "true").lower() == "false":
        raise ImportError("AI explicitly disabled via ENABLE_AI")
        
    from ultralytics import YOLO
    import cv2
    from modules.detect_object_on_video import detect_object_on_video
    HAS_AI_LIBS = True
except ImportError:
    HAS_AI_LIBS = False
    logging.warning("⚠️  Heavy AI libraries (ultralytics, opencv) not found or disabled. Fallback to MOCK mode active.")

# PUBLIC BLUEPRINT...
public_bp = Blueprint('public',__name__, url_prefix='/api/v1/public')

# DETECT OBJECT ON IMAGE (Guarded)
def detect_object_on_image(image_file):
    if not HAS_AI_LIBS:
        # Standardized mock response format
        return {
            "status": "success",
            "accident_detected": False,
            "confidence": 0.0,
            "ai_enabled": False,
            "message": "AI libraries unavailable, using mock response",
            "detections": [[10, 10, 100, 100, "mock_accident", 0.99]]
        }
    
    try:
        model = YOLO('./models/i1-yolov8s.pt')
        results = model.predict(image_file)
        result = results[0]
        output = []
        for box in result.boxes:
            x1,y1,x2,y2 = [round(x) for x in box.xyxy[0].tolist()]
            class_id = box.cls[0].item()
            prob = round(box.conf[0].item(),2)
            output.append([x1,y1,x2,y2,result.names[class_id],prob])
            
        return {
            "status": "success",
            "accident_detected": len(output) > 0,
            "confidence": output[0][5] if output else 0.0,
            "ai_enabled": True,
            "detections": output
        }
    except Exception as e:
        logging.error(f"Error in AI inference: {str(e)}")
        return {
            "status": "error",
            "message": f"Inference failed: {str(e)}",
            "ai_enabled": True,
            "fallback": True
        }

# GENERATE FRAMES (Guarded)
def generate_frames(path_x = ''):
    if not HAS_AI_LIBS:
        # Mock frame for streaming to prevent client crashes
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + b'mock_frame_data' + b'\r\n')
        return

    try:
        yolo_output = detect_object_on_video(path_x)
        for detection_ in yolo_output:
            if detection_ is None:
                continue
            ref,buffer=cv2.imencode('.jpg',detection_)
            frame=buffer.tobytes()
            yield (b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + frame +b'\r\n')
    except Exception as e:
        logging.error(f"Error generating frames: {str(e)}")
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + b'error_frame_data' + b'\r\n')
        
# ROUTES FOR HOME...
@public_bp.route('/',methods=['GET'])
def return_home():
    return jsonify({
        "status": "success",
        "service": "Public API",
        "message": "Welcome to home api page.",
        "ai_enabled": HAS_AI_LIBS
    })

# MOCK DETECTION ENDPOINT (Consistent with AI Response Schema)
@public_bp.route('/detect', methods=['GET', 'POST'])
def mock_detect():
    return jsonify({
        "status": "success",
        "accident_detected": False,
        "confidence": 0.0,
        "ai_enabled": HAS_AI_LIBS,
        "message": "Standardized mock detection response",
        "detections": [
            {"box": [50, 50, 200, 200], "label": "accident_placeholder", "confidence": 0.0}
        ]
    })

# ROUTES FOR APPLY MODEL...
@public_bp.route('/apply-model', methods=['POST'])
def detect_object():
    try:
        if not HAS_AI_LIBS:
            return jsonify(detect_object_on_image(None))
            
        image_file = request.files['image']
        result = detect_object_on_image(Image.open(image_file.stream))
        
        # Maintain backward compatibility while providing standardized data
        if result.get("status") == "success":
            return Response(
                json.dumps(result["detections"]),
                mimetype='application/json'
            )
        return jsonify(result)
    except Exception as e:
        return jsonify({
            "status": 'error',
            'message': str(e),
            "ai_enabled": HAS_AI_LIBS,
            "fallback": True
        }), 500


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