import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

# Backend URL
base_url = (os.getenv("GODSEYE_API") or "").rstrip("/")
url = f"{base_url}/api/v1/auth/register"

# User data - CHANGE THESE TO YOUR DESIRED CREDENTIALS
data = {
    "username": "yashaditya1212@gmail.com",
    "password": "Test@1234"
}

# Make the POST request
try:
    response = requests.post(url, json=data)
    
    # Print the response
    print("Status Code:", response.status_code)
    print("Response:", response.json())
    
    if response.status_code == 201:
        print("\n✅ User registered successfully!")
    else:
        print("\n❌ Registration failed. Check the error message above.")
        
except requests.exceptions.ConnectionError:
    print("❌ Error: Could not connect to backend.")
    print("   Make sure GODSEYE_API is set and the Flask API is running.")
except Exception as e:
    print(f"❌ Error: {e}")
