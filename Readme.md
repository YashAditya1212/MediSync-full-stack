<p align="center">
  <img src="frontend/src/assets/logo.svg" alt="MediSync Logo" width="120"/>
</p>

<h1 align="center">MediSync</h1>
<p align="center">
  <strong>A full-stack medical appointment platform with CNN based Emergency Response System</strong>
</p>

<p align="center">
  <!-- MediSync Core -->
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat-square&logo=mongodb" />
  <img src="https://img.shields.io/badge/Cloudinary-Image%20Storage-3448C5?style=flat-square&logo=cloudinary" />
  <img src="https://img.shields.io/badge/Razorpay-Payments-02042B?style=flat-square" />
  <img src="https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?style=flat-square&logo=tailwind-css" />
</p>

<p align="center">
  <!-- God's Eye -->
  <img src="https://img.shields.io/badge/YOLOv8-Object%20Detection-FF6B35?style=flat-square" />
  <img src="https://img.shields.io/badge/PyTorch-ML%20Runtime-EE4C2C?style=flat-square&logo=pytorch" />
  <img src="https://img.shields.io/badge/OpenCV-Computer%20Vision-5C3EE8?style=flat-square&logo=opencv" />
  <img src="https://img.shields.io/badge/Flask-Python%20Server-000000?style=flat-square&logo=flask" />
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Dashboard-3178C6?style=flat-square&logo=typescript" />
</p>

---

## What is MediSync?

MediSync is a full-stack healthcare platform built to streamline the entire OPD (Outpatient Department) experience. Patients can browse doctors by speciality, book time slots, manage their appointments, and pay online — all from a single interface. Doctors get their own dashboard to manage schedules and mark appointments complete. Admins have full control over the platform through a dedicated admin panel embedded within the frontend.

The heart of the project is **God's Eye**, an integrated AI-powered accident detection module using YOLOv8 that can analyse CCTV or uploaded footage and trigger emergency response alerts in real time.

The UI is built with an Awards-inspired design philosophy — mint green & white palette, glassmorphism cards, smooth animations, a custom cursor, dark mode support, and a starry background system.

---

## Features

### Patient Portal
- Register and log in with JWT-based authentication
- Browse all doctors, filter by speciality
- View doctor profiles — degree, experience, fees, about
- Book appointments by selecting a date and 30-minute time slot
- View all upcoming and past appointments
- Cancel appointments with slot release back to the doctor
- Pay appointment fees online via Razorpay
- Manage personal profile — name, phone, address, DOB, gender, profile photo (stored on Cloudinary)

### Doctor Dashboard (Admin Panel)
- Doctors log in via the unified `/join` role-selection page
- View all appointments assigned to them
- Mark appointments as completed or cancel them
- View personal dashboard with earnings, patient count, and latest appointments
- Update their own profile information and availability status

### Admin Panel
- Secure admin login via unified `/join` role-selection page
- Add new doctors with full profile details and photo upload
- View and manage all doctors on the platform
- View all appointments across the entire platform
- Cancel any appointment
- Dashboard with platform-wide stats — doctors, patients, appointments, latest bookings

### God's Eye (AI Module)
- YOLOv8-powered vehicle accident detection using a custom-trained model (`i1-yolov8s.pt`)
- Real-time video inference with SORT multi-object tracking
- Standalone Next.js 14 dashboard for monitoring detected accidents
- Interactive map with Leaflet showing accident coordinates
- Automatic emergency email alert on accident detection via Flask-Mail
- Accident frame captured and uploaded to Cloudinary on detection
- Geolocation via geopy / Nominatim reverse geocoding
- Accessible via the pulsing "God's Eye" button in the MediSync navbar
- Separate Python model implementor for local CCTV / video file processing

---

## Tech Stack

### MediSync

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Authentication | JSON Web Tokens (JWT) |
| Image Storage | Cloudinary |
| File Uploads | Multer |
| Payments | Razorpay, Stripe |
| Password Hashing | bcrypt |

### God's Eye

| Layer | Technology |
|---|---|
| AI Model | YOLOv8 (Ultralytics), custom-trained `i1-yolov8s.pt` |
| ML Runtime | PyTorch, TorchVision |
| Computer Vision | OpenCV, cvzone, SORT tracker |
| Flask Server | Python 3, Flask, Flask-Mail, Flask-JWT-Extended, Flask-CORS |
| Database | MongoDB (PyMongo) |
| Dashboard Client | Next.js 14, TypeScript, TanStack Query, React Leaflet, Chart.js |
| Geolocation | geopy, Nominatim (OpenStreetMap) |
| Image Upload | Cloudinary |
| Email Alerts | aiosmtplib (model-implementor), Flask-Mail (server) |

---

## Project Structure

```
MediSync-full-stack/
│
├── frontend/                              # Patient-facing React app (also hosts admin panel)
│   └── src/
│       ├── context/
│       │   ├── AppContext.jsx             # Global state: doctors list, backend URL, currency
│       │   ├── UserContext.jsx            # Auth state: token, user data, login/logout
│       │   ├── DarkModeContext.jsx        # Dark mode toggle state
│       │   └── admin/
│       │       ├── AdminContext.jsx       # Admin API calls and state
│       │       ├── DoctorContext.jsx      # Doctor API calls and state
│       │       └── AdminAppContext.jsx    # Shared admin context
│       ├── pages/
│       │   ├── Home.jsx                  # Landing page
│       │   ├── Doctors.jsx               # Browse & filter doctors
│       │   ├── Appointment.jsx           # Book an appointment
│       │   ├── MyAppointments.jsx        # View, cancel, and pay for appointments
│       │   ├── MyProfile.jsx             # View and edit user profile
│       │   ├── Join.jsx                  # Unified role-selection login page
│       │   ├── Login.jsx                 # Patient login / Sign Up
│       │   ├── About.jsx
│       │   ├── Contact.jsx
│       │   ├── PrivacyPolicy.jsx
│       │   ├── TermsOfService.jsx
│       │   ├── GodsEye.jsx               # God's Eye AI module page
│       │   └── admin/                    # Admin + Doctor dashboard pages (merged)
│       │       ├── Dashboard.jsx
│       │       ├── AddDoctor.jsx
│       │       ├── DoctorsList.jsx
│       │       ├── AllAppointments.jsx
│       │       ├── DoctorAppointments.jsx
│       │       ├── DoctorDashboard.jsx
│       │       └── DoctorProfile.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── Header.jsx
│       │   ├── Banner.jsx
│       │   ├── About.jsx
│       │   ├── Services.jsx
│       │   ├── StatsBar.jsx
│       │   ├── WhyChooseUs.jsx
│       │   ├── GallerySection.jsx
│       │   ├── ContactSection.jsx
│       │   ├── DoctorsSection.jsx
│       │   ├── TopDoctors.jsx
│       │   ├── SpecialityMenu.jsx
│       │   ├── RelatedDoctors.jsx
│       │   ├── DecorativeLine.jsx
│       │   ├── StarryBackground.jsx
│       │   ├── CursorAnimation.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── GodsEyeSection.jsx        # God's Eye home page section
│       │   ├── GodsEyeShowcase.jsx       # Five-slide vertical auto-scroll showcase
│       │   ├── GodsEye/                  # God's Eye UI sub-components
│       │   │   ├── Hero.jsx
│       │   │   ├── Features.jsx
│       │   │   ├── InputForm.jsx
│       │   │   ├── ModelTest.jsx
│       │   │   └── Layouts.jsx
│       │   ├── admin/
│       │   │   ├── Navbar.jsx
│       │   │   └── Sidebar.jsx
│       │   └── UI/
│       │       ├── CustomCursor.jsx
│       │       ├── DarkModeToggle.jsx
│       │       └── SmoothScroll.jsx
│       └── assets/                       # Images, SVGs, video assets
│
├── backend/                              # Express REST API
│   ├── server.js                         # Entry point, middleware setup
│   ├── config/
│   │   ├── mongodb.js                    # MongoDB connection
│   │   └── cloudinary.js                # Cloudinary configuration
│   ├── models/
│   │   ├── userModel.js                  # Patient schema
│   │   ├── doctorModel.js                # Doctor schema
│   │   └── appointmentModel.js           # Appointment schema
│   ├── controllers/
│   │   ├── userController.js             # Patient logic
│   │   ├── doctorController.js           # Doctor logic
│   │   └── adminController.js            # Admin logic
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── doctorRoute.js
│   │   ├── adminRoute.js
│   │   └── godsEyeRoute.js               # Proxy routes → Flask server
│   └── middleware/
│       ├── authUser.js
│       ├── authDoctor.js
│       ├── authAdmin.js
│       └── multer.js
│
└── God's Eye/                            # Standalone accident detection system
    ├── model-implementor/                # Runs YOLOv8 inference locally
    │   ├── app.py                        # Main detection loop (video/CCTV input)
    │   ├── models/
    │   │   └── i1-yolov8s.pt             # Custom-trained accident detection model
    │   ├── assets/                       # Test video clips
    │   ├── modules/
    │   │   ├── sort.py                   # SORT multi-object tracker
    │   │   └── send_mail_async.py        # Direct async SMTP email (aiosmtplib)
    │   └── services/
    │       └── apis.py                   # HTTP calls to Flask server
    │
    ├── server/                           # Flask REST API (port 8080)
    │   ├── app.py                        # Flask app entry point
    │   ├── blueprints/
    │   │   ├── accident/accident.py      # Accident create/read routes
    │   │   ├── auth/auth.py              # JWT auth routes
    │   │   ├── emails/emails.py          # Email alert endpoint
    │   │   └── public/public.py          # Video streaming & detection routes
    │   ├── modules/
    │   │   └── detect_object_on_video.py # Server-side YOLO inference
    │   └── db-models/
    │       └── models.py                 # MongoDB document models
    │
    └── client/                           # Next.js 14 monitoring dashboard (TypeScript)
        ├── app/
        │   ├── (auth)/                   # Login page & layout
        │   ├── (dashboard)/              # Accident data tables, maps, recent updates
        │   └── (mainboard)/              # Public landing page
        └── components/
            ├── auth/                     # LoginForm, UserNav
            ├── charts/                   # Chart.js wrappers
            ├── dashboard/                # DataTable, MainSection, TopNavbar
            └── misc/
                └── CustomMap.tsx         # React Leaflet accident map
```

---

## API Reference

### User Routes — `/api/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | None | Create a new patient account |
| POST | `/login` | None | Login and receive JWT |
| GET | `/get-profile` | User | Fetch user profile data |
| POST | `/update-profile` | User | Update profile + photo upload |
| POST | `/book-appointment` | User | Book a doctor appointment |
| GET | `/appointments` | User | Get all user appointments |
| POST | `/cancel-appointment` | User | Cancel an appointment |
| POST | `/payment-razorpay` | User | Initiate Razorpay payment |
| POST | `/verifyRazorpay` | User | Verify Razorpay payment |
| POST | `/payment-stripe` | User | Initiate Stripe payment |
| POST | `/verifyStripe` | User | Verify Stripe payment |

### Doctor Routes — `/api/doctor`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/login` | None | Doctor login |
| GET | `/list` | None | Get all doctors (public) |
| GET | `/appointments` | Doctor | Doctor's appointments |
| POST | `/complete-appointment` | Doctor | Mark appointment complete |
| POST | `/cancel-appointment` | Doctor | Cancel appointment |
| GET | `/dashboard` | Doctor | Doctor dashboard stats |
| GET | `/profile` | Doctor | Get doctor profile |
| POST | `/update-profile` | Doctor | Update doctor profile |
| POST | `/change-availability` | Doctor | Toggle availability |

### Admin Routes — `/api/admin`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/login` | None | Admin login |
| POST | `/add-doctor` | Admin | Add a new doctor |
| GET | `/all-doctors` | Admin | Get all doctors |
| POST | `/change-availability` | Admin | Toggle doctor availability |
| GET | `/appointments` | Admin | All appointments platform-wide |
| POST | `/cancel-appointment` | Admin | Cancel any appointment |
| GET | `/dashboard` | Admin | Platform stats |

### God's Eye Proxy Routes — `/api/gods-eye` (via Node → Flask)

| Method | Endpoint | Forwards To | Description |
|---|---|---|---|
| GET | `/health` | Node (direct) | Check if Flask server is online |
| POST | `/accident/create` | Flask `/api/v1/accident/create` | Log a new accident event |
| POST | `/emails/send-email` | Flask `/api/v1/emails/send-email` | Trigger emergency email alert |
| GET | `/public/` | Flask `/api/v1/public/` | Video stream & detection endpoint |

---

## Database Models

### User
| Field | Type | Notes |
|---|---|---|
| name | String | Required |
| email | String | Required, unique |
| password | String | Hashed with bcrypt |
| image | String | Cloudinary URL |
| phone | String | Default: '000000000' |
| address | Object | `{ line1, line2 }` |
| gender | String | Default: 'Not Selected' |
| dob | String | Date of birth |

### Doctor
| Field | Type | Notes |
|---|---|---|
| name | String | Required |
| email | String | Required, unique |
| password | String | Hashed with bcrypt |
| image | String | Cloudinary URL |
| speciality | String | e.g. 'General physician' |
| degree | String | |
| experience | String | e.g. '5 Years' |
| about | String | |
| available | Boolean | Default: true |
| fees | Number | Appointment fee |
| slots_booked | Object | `{ date: [times] }` |
| address | Object | `{ line1, line2 }` |

### Appointment
| Field | Type | Notes |
|---|---|---|
| userId | String | Reference to User |
| docId | String | Reference to Doctor |
| userData | Object | Snapshot of user at booking |
| docData | Object | Snapshot of doctor at booking |
| slotDate | String | Format: `DD_MM_YYYY` |
| slotTime | String | e.g. `10:30 AM` |
| amount | Number | Fee at time of booking |
| payment | Boolean | Default: false |
| cancelled | Boolean | Default: false |
| isCompleted | Boolean | Default: false |

---

## Local Setup

### Prerequisites
- Node.js v18+
- Python 3.10+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Razorpay account (optional, for payments)

### 1. Clone the repository
```bash
git clone https://github.com/YashAditya1212/MediSync-full-stack.git
cd MediSync-full-stack
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret_key
ADMIN_EMAIL=admin@medisync.com
ADMIN_PASSWORD=your_admin_password
CURRENCY=INR
GODS_EYE_URL=http://localhost:8080
RAZORPAY_KEY_ID=your_razorpay_key_id           # optional
RAZORPAY_KEY_SECRET=your_razorpay_key_secret   # optional
STRIPE_SECRET_KEY=your_stripe_secret_key       # optional
```

Start the backend:
```bash
npm run server
```

### 3. Frontend setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` folder:
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=₹
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id   # optional
```

Start the frontend:
```bash
npm run dev
```

The apps will be running at:
- **Frontend (+ Admin Panel):** http://localhost:5173
- **Backend API:** http://localhost:4000
- **Admin / Doctor Login:** http://localhost:5173/join

### 4. God's Eye — Flask server
```bash
cd "../God's Eye/server"
pip install -r requirements.txt
```

Create a `.env` file in `God's Eye/server/`:
```env
EMAIL=your-gmail@gmail.com
PASSWORD=your-gmail-app-password
SENDTO=recipient@gmail.com
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
MONGODB_URI=mongodb://localhost:27017/
JWT_SECRET_KEY=your_jwt_secret
FLASK_SECRET_KEY=your_flask_secret
```

Start the Flask server:
```bash
python app.py
```

### 5. God's Eye — Model implementor
```bash
cd "../model-implementor"
pip install -r requirements.txt
```

Create a `.env` file in `God's Eye/model-implementor/`:
```env
EMAIL_SENDER=your-gmail@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

Run detection on a video file:
```bash
python app.py --source ./assets/car-crash.mov
# Or process a whole folder of clips
python app.py --folder ./assets/cctv_footage/
```

### 6. God's Eye — Next.js dashboard (optional)
```bash
cd "../client"
npm install
npm run dev
```

Dashboard runs at: http://localhost:3000

---

## Deployment

### Backend → Render
1. Push your code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set Build Command: `npm install`
4. Set Start Command: `node server.js`
5. Add all environment variables from your `.env`

### Frontend → Vercel
1. Import the repo on [Vercel](https://vercel.com)
2. Set the **Root Directory** to `frontend/`
3. Add `VITE_BACKEND_URL` pointing to your Render backend URL
4. The `vercel.json` handles SPA routing — no extra config needed

### God's Eye Flask Server → Render (separate service)
1. Create a second Web Service on Render
2. Set Root Directory to `God's Eye/server`
3. Set Build Command: `pip install -r requirements.txt`
4. Set Start Command: `python app.py`
5. Update `GODS_EYE_URL` in your backend env to point to the deployed Flask URL

---

## Author

**Yash Aditya Mishra**  
B.Tech Student | DevOps & Cloud Developer  
[GitHub](https://github.com/YashAditya1212)

---

## License

This project is for educational and portfolio purposes. Any commercial use is strictly prohibited.
