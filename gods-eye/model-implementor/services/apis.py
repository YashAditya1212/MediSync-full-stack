import httpx
import os
from dotenv import load_dotenv

load_dotenv()

BASE_API_URL = (os.getenv("GODSEYE_API") or "").rstrip("/")
API_URL = f"{BASE_API_URL}/api/v1/accident/create"
SEND_MAIL_URL = f"{BASE_API_URL}/api/v1/emails/send-email"

async def post_accident_data(data):
    async with httpx.AsyncClient() as client:
        response = await client.post(API_URL, json=data)
        return response
    
async def send_mail_async_final(latitude, longitude, severity, location):
    async with httpx.AsyncClient() as client:
        response = await client.post(SEND_MAIL_URL, json={"latitude": latitude, "longitude": longitude, "severity": severity, "location": location})
        return response
