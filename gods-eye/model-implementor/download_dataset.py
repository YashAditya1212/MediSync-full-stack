import os
import sys
import subprocess
import json
from pathlib import Path

FOOTAGE_DIR = Path(__file__).resolve().parent / "assets" / "cctv_footage"
THUMBS_DIR = Path(__file__).resolve().parent / "assets" / "thumbnails"

YOUTUBE_URLS = [
    "ytsearch2:CCTV traffic accident compilation",
    "ytsearch2:road accident dashcam footage",
    "ytsearch2:intersection car crash CCTV",
    "ytsearch2:highway accident surveillance camera",
    "ytsearch2:urban street crash cctv",
    "ytsearch1:parking lot accident cctv",
    "ytsearch2:dashcam collision near intersection",
]

def ensure_dirs():
    FOOTAGE_DIR.mkdir(parents=True, exist_ok=True)
    THUMBS_DIR.mkdir(parents=True, exist_ok=True)

def ensure_yt_dlp():
    try:
        import yt_dlp  # noqa: F401
    except Exception:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "yt-dlp"])

def download_videos():
    from yt_dlp import YoutubeDL
    outtmpl = str(FOOTAGE_DIR / "%(title).40s_%(id)s.%(ext)s")
    ydl_opts = {
        "format": "best[height<=480]",
        "outtmpl": outtmpl,
        "nooverwrites": True,
        "noplaylist": True,
        "match_filter": "duration < 300",
        "quiet": False,
        "restrictfilenames": False,
    }
    downloaded = []
    with YoutubeDL(ydl_opts) as ydl:
        for query in YOUTUBE_URLS:
            try:
                ydl.download([query])
            except Exception:
                continue
    for p in FOOTAGE_DIR.iterdir():
        if p.is_file() and p.suffix.lower() in {".mp4", ".mov", ".avi", ".mkv", ".webm"}:
            downloaded.append(p.name)
    return downloaded

def generate_thumbnails(files):
    try:
        import cv2
    except Exception as e:
        print(f"opencv-python not available: {e}")
        return []
    created = []
    for name in files:
        src = FOOTAGE_DIR / name
        stem = Path(name).stem + ".jpg"
        dst = THUMBS_DIR / stem
        if dst.exists():
            continue
        cap = cv2.VideoCapture(str(src))
        ok, frame = cap.read()
        cap.release()
        if ok and frame is not None:
            cv2.imwrite(str(dst), frame)
            created.append(stem)
    return created

def human_mb(nbytes):
    return round(nbytes / (1024 * 1024), 2)

def folder_size(path: Path):
    total = 0
    for root, _, files in os.walk(path):
        for f in files:
            total += (Path(root) / f).stat().st_size
    return total

def main():
    ensure_dirs()
    ensure_yt_dlp()
    files_before = {p.name for p in FOOTAGE_DIR.iterdir() if p.is_file()} if FOOTAGE_DIR.exists() else set()
    files = download_videos()
    if not files:
        files = [p.name for p in FOOTAGE_DIR.iterdir() if p.is_file()]
    thumbs = generate_thumbnails(files)
    all_files = [p.name for p in FOOTAGE_DIR.iterdir() if p.is_file() and p.suffix.lower() in {'.mp4','.mov','.avi','.mkv','.webm'}]
    size_mb = human_mb(folder_size(FOOTAGE_DIR))
    new_count = len(set(all_files) - files_before)
    summary = {
        "clips_total": len(all_files),
        "clips_new": new_count,
        "disk_usage_mb": size_mb,
        "files": sorted(all_files),
        "thumbnails_created": thumbs,
    }
    print(json.dumps(summary, indent=2))

if __name__ == "__main__":
    main()

