# MediSync + God's Eye: Integrated Smart Health & Safety Platform

## 1. Project Overview
This project is a unified full-stack application that merges two powerful systems into a single, cohesive platform:
1.  **MediSync**: A comprehensive Medical OPD Booking System for patients, doctors, and administrators.
2.  **God's Eye**: An AI-powered Accident Detection & Emergency Response System using CNN (Convolutional Neural Networks).

The platform features a high-end, **Awwwards-inspired UI** with a "Mint Green & White" aesthetic, glassmorphism effects, smooth animations, and technical precision.

---

## 2. Core Modules

### A. MediSync (OPD Booking System)
A robust appointment management system designed to streamline the interaction between patients and healthcare providers.

*   **User Roles:**
    *   **Patients:** Book appointments, browse doctors by specialty, view profile/history.
    *   **Doctors:** Manage availability, view appointments, update profile (via Admin Panel).
    *   **Admin:** Manage doctors, users, and appointments.
*   **Key Features:**
    *   Doctor listing with filtering (Specialty, Availability).
    *   Secure authentication and profile management.
    *   Payment integration (Razorpay/Stripe).
    *   Responsive "Top Doctors" grid layout.

### B. God's Eye (Accident Detection System)
An intelligent emergency response module integrated directly into the main platform.

*   **Functionality:**
    *   **Real-time Detection:** Uses CCTV footage to detect vehicle accidents.
    *   **Model:** Powered by **YOLOv8 (You Only Look Once)** for object detection.
    *   **Emergency Response:** Automatically triggers alerts and dispatches help upon accident detection.
    *   **Live Demo:** Users can upload video footage to test the detection capabilities directly from the UI.
*   **Integration:** Accessed via a dedicated "God's Eye" pulsing button in the Navbar.

---

## 3. Technology Stack

### Frontend (Unified)
*   **Framework:** React (Vite)
*   **Styling:** Tailwind CSS (Custom "Mint Green" Theme)
*   **Animations:** Framer Motion, GSAP
*   **3D Graphics:** Three.js / React Three Fiber (Starry Background)
*   **UX Enhancements:** 
    *   Lenis (Smooth Scrolling)
    *   Glassmorphism (Backdrop Blur)
    *   Custom Cursor (Mint Trail Effect)

### Backend Services
*   **MediSync Backend:**
    *   **Runtime:** Node.js
    *   **Framework:** Express.js
    *   **Database:** MongoDB (Mongoose)
    *   **Auth:** JWT (JSON Web Tokens)
    *   **Storage:** Cloudinary (Image uploads)

*   **God's Eye Server:**
    *   **Runtime:** Python
    *   **Framework:** Flask
    *   **AI/ML:** PyTorch, YOLOv8, OpenCV
    *   **Database:** MongoDB (PyMongo)

### Admin Panel
*   **Framework:** React (Vite)
*   **Styling:** Tailwind CSS

---

## 4. UI/UX Design Philosophy
The interface is designed to be **"Clean, Technical, and Precise"** using a strict **Mint Green (#059669 / #A7F3D0)** and **White** palette.

*   **Visual Style:** Medical precision meets modern tech.
*   **Interactions:** Weighted smooth scrolling, magnetic hover effects, and staggered content reveals.
*   **Typography:** Clean Sans-Serif (Outfit / Inter) for professional readability.
*   **Atmosphere:** A subtle interactive starry background adds depth without distracting from the content.

---

## 5. Directory Structure
```
MediSync-full-stack/
├── frontend/                # Main Unified Client Application
│   ├── src/
│   │   ├── components/      # UI Components (Navbar, Hero, etc.)
│   │   ├── pages/           # Route Pages (Home, Doctors, GodsEye, etc.)
│   │   └── assets/          # Static Assets
│   └── public/              # Public assets (models, gifs)
│
├── backend/                 # MediSync Node.js API
│   ├── models/              # Mongoose Schemas
│   ├── controllers/         # Route Logic
│   └── routes/              # API Endpoints
│
├── admin/                   # Doctor/Admin Dashboard
│   └── src/pages/           # Admin Interfaces
│
└── God's Eye/               # Original AI Project Files
    ├── server/              # Python Flask API (Inference Engine)
    ├── model-implementor/   # YOLO Training & Scripts
    └── client/              # (Legacy Next.js client, now merged into frontend)
```

## 6. Setup & Execution

### Prerequisites
*   Node.js & npm
*   Python 3.8+
*   MongoDB (Local or Atlas)

### Running the Project
1.  **Frontend (Main App):**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
2.  **MediSync Backend:**
    ```bash
    cd backend
    npm install
    npm start
    ```
3.  **God's Eye Server (AI):**
    ```bash
    cd "God's Eye/server"
    pip install -r requirements.txt
    python app.py
    ```
4.  **Admin Panel:**
    ```bash
    cd admin
    npm install
    npm run dev
    ```
