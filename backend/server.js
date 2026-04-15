import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// Validate required environment variables
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
const missingEnv = requiredEnv.filter(env => !process.env[env]);

if (missingEnv.length > 0) {
  console.error(`[FATAL] Missing required environment variables: ${missingEnv.join(', ')}`);
  process.exit(1);
}

// app config
const app = express()
const port = Number(process.env.PORT) || 4002

// Security & Rate Limiting
app.use(helmet())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP, please try again after 15 minutes'
})
app.use('/api', limiter)

// Optimized Request Logging
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
  })
}

const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  process.env.GODSEYE_DASHBOARD_URL || "http://localhost:3000",
  process.env.ADMIN_URL || "http://localhost:5174",
  ...(process.env.ADDITIONAL_CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
].filter(Boolean)

// middlewares
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
}))

// Health Check Routes
app.get("/", (req, res) => {
  res.json({ status: "healthy", service: "MediSync Backend API" })
});

app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
});

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${new Date().toISOString()} | ${req.method} ${req.url}`);
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'An internal server error occurred' 
      : err.message
  });
});

const startServer = (p) => {
  const server = app.listen(p, () => {
    console.log(` Server started on PORT:${p}`)
  })

  // Graceful Shutdown
  process.on('SIGTERM', () => {
    console.info('[SHUTDOWN] SIGTERM received. Closing server...');
    server.close(() => {
      console.info('[SHUTDOWN] Server closed.');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.info('[SHUTDOWN] SIGINT received. Closing server...');
    server.close(() => {
      console.info('[SHUTDOWN] Server closed.');
      process.exit(0);
    });
  });

  server.on('error', (err) => {
    if (err?.code === 'EADDRINUSE') {
      console.error(`PORT ${p} is already in use.`)
      console.error(`Fix: Stop the other process using ${p}, or change PORT in backend/.env (example: PORT=${p + 1}).`)
      process.exit(1)
    }
    console.error(' Server error:', err)
    process.exit(1)
  })
}

const bootstrap = async () => {
  try {
    await connectDB()
    connectCloudinary()
    startServer(port)
  } catch (err) {
    console.error('Failed to start server:', err?.message || err)
    process.exit(1)
  }
}

bootstrap()
