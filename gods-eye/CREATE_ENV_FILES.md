# Creating .env Files - Quick Setup Guide

I've created template files for all three parts of your project. Follow these steps to create your `.env` files:

## 📁 Step 1: Create Server .env File

1. **Navigate to the `server` directory:**
   ```bash
   cd server
   ```

2. **Copy the template to create .env:**
   ```bash
   # Windows PowerShell
   Copy-Item env-template.txt .env
   
   # Windows CMD
   copy env-template.txt .env
   
   # Mac/Linux
   cp env-template.txt .env
   ```

3. **Open `.env` file and fill in your values:**
   - `FLASK_SECRET_KEY` - Generate with: `python -c "import secrets; print(secrets.token_hex(32))"`
   - `JWT_SECRET_KEY` - Generate with: `python -c "import secrets; print(secrets.token_hex(32))"`
   - `MONGODB_URI` - Use `mongodb://localhost:27017/` for local MongoDB
   - `EMAIL` - Your Gmail address
   - `PASSWORD` - Gmail App Password (see instructions below)
   - `SENDTO` - Email to receive accident alerts
   - `CLOUD_NAME`, `API_KEY`, `API_SECRET` - From Cloudinary (see links below)

## 📁 Step 2: Create Model Implementor .env File

1. **Navigate to the `model-implementor` directory:**
   ```bash
   cd model-implementor
   ```

2. **Copy the template:**
   ```bash
   # Windows PowerShell
   Copy-Item env-template.txt .env
   
   # Windows CMD
   copy env-template.txt .env
   
   # Mac/Linux
   cp env-template.txt .env
   ```

3. **Fill in your email credentials** (same as server if using same Gmail account)

## 📁 Step 3: Create Client .env File

1. **Navigate to the `client` directory:**
   ```bash
   cd client
   ```

2. **Copy the template:**
   ```bash
   # Windows PowerShell
   Copy-Item env-template.txt .env.local
   
   # Windows CMD
   copy env-template.txt .env.local
   
   # Mac/Linux
   cp env-template.txt .env.local
   ```
   **Note:** Next.js uses `.env.local` for local development

3. **Fill in:**
   - `NEXT_PUBLIC_BACKEND_URL` - Usually `http://127.0.0.1:8080`
   - `EMAIL` - Your Gmail address
   - `EMAIL_PASS` - Gmail App Password

---

## 🔑 How to Get Your API Keys

### Gmail App Password
1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to: https://myaccount.google.com/apppasswords
4. Select **Mail** and **Other (Custom name)**
5. Enter "Accident Detection System" as the name
6. Click **Generate**
7. Copy the 16-character password (use this as `PASSWORD` or `EMAIL_PASS`)

### Cloudinary Credentials
1. **Sign up:** https://cloudinary.com/users/register/free
2. **Dashboard:** https://console.cloudinary.com/
3. **Get API Keys:** https://console.cloudinary.com/settings/api-keys
4. Copy:
   - **Cloud name** → `CLOUD_NAME`
   - **API Key** → `API_KEY`
   - **API Secret** → `API_SECRET`

### MongoDB Setup
**Option 1: Local MongoDB**
- Download: https://www.mongodb.com/try/download/community
- Install and start the service
- Use: `MONGODB_URI=mongodb://localhost:27017/`

**Option 2: MongoDB Atlas (Cloud)**
- Sign up: https://www.mongodb.com/cloud/atlas/register
- Create a free cluster
- Get connection string from: https://cloud.mongodb.com/
- Use: `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/`

---

## ✅ Quick Verification

After creating all `.env` files, verify they exist:

```bash
# Check server .env
ls server/.env

# Check model-implementor .env
ls model-implementor/.env

# Check client .env.local
ls client/.env.local
```

---

## 🚀 Next Steps

1. ✅ Create all three `.env` files (using templates above)
2. ✅ Fill in all the required values
3. ✅ Start MongoDB (if using local)
4. ✅ Run the backend: `cd server && python app.py`
5. ✅ Run the frontend: `cd client && npm run dev`
6. ✅ Run model implementor: `cd model-implementor && python app.py`

---

## 📝 Template Files Location

- `server/env-template.txt` → Copy to `server/.env`
- `model-implementor/env-template.txt` → Copy to `model-implementor/.env`
- `client/env-template.txt` → Copy to `client/.env.local`

