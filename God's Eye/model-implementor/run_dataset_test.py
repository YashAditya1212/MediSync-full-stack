import os
import json
import time
from pathlib import Path
import numpy as np
import torch
import cv2
from ultralytics import YOLO
from modules.sort import Sort

BASE_DIR = Path(__file__).resolve().parent
FOOTAGE_DIR = BASE_DIR / "assets" / "cctv_footage"
RESULTS_LOG = BASE_DIR / "assets" / "results_log.json"

def list_videos():
    exts = {".mp4", ".mov", ".avi", ".mkv", ".webm"}
    return [p for p in FOOTAGE_DIR.iterdir() if p.is_file() and p.suffix.lower() in exts]

def process_video(model, tracker, path: Path, conf_thresh=0.4):
    cap = cv2.VideoCapture(str(path))
    if not cap.isOpened():
        return {"filename": path.name, "accidents_detected": 0, "processing_time_seconds": 0.0, "fps_achieved": 0.0}
    unique_ids = set()
    frames = 0
    t0 = time.perf_counter()
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        results = model(frame, stream=True)
        detections = np.empty((0, 5))
        for r in results:
            for box in r.boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                conf = float(box.conf[0])
                if conf >= conf_thresh:
                    detections = np.vstack((detections, np.array([x1, y1, x2, y2, conf])))
        tracks = tracker.update(detections)
        for tr in tracks:
            track_id = int(tr[4]) if len(tr) > 4 else None
            if track_id is not None:
                unique_ids.add(track_id)
        frames += 1
    cap.release()
    elapsed = max(time.perf_counter() - t0, 1e-6)
    fps = frames / elapsed if elapsed > 0 else 0.0
    return {
        "filename": path.name,
        "accidents_detected": len(unique_ids),
        "processing_time_seconds": round(elapsed, 2),
        "fps_achieved": round(fps, 2),
    }

def main():
    torch.set_num_threads(2)
    model = YOLO(str(BASE_DIR / "models" / "i1-yolov8s.pt"))
    model.overrides["half"] = False
    tracker = Sort(max_age=20, min_hits=3, iou_threshold=0.3)
    videos = list_videos()
    results = []
    for v in videos:
        print(f"▶ Processing: {v.name}")
        res = process_video(model, tracker, v)
        results.append(res)
        print(f"✓ {v.name}: accidents={res['accidents_detected']} time={res['processing_time_seconds']}s fps={res['fps_achieved']}")
    RESULTS_LOG.parent.mkdir(parents=True, exist_ok=True)
    with open(RESULTS_LOG, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    if results:
        print("\nSummary")
        print("File\tAccidents\tTime(s)\tFPS")
        for r in results:
            print(f"{r['filename']}\t{r['accidents_detected']}\t{r['processing_time_seconds']}\t{r['fps_achieved']}")
    else:
        print("No videos found.")

if __name__ == "__main__":
    main()

