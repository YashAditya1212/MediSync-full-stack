import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = Number(process.env.PORT) || 4002

// middlewares
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: [
    process.env.FRONTEND_URL || "http://localhost:5173",
    "http://localhost:5174", // Admin panel
    "http://localhost:5175"  // Secondary admin/doctor panel
  ],
  credentials: true,
}))

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

const startServer = (p) => {
  const server = app.listen(p, () => {
    console.log(` Server started on PORT:${p}`)
  })

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