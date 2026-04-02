import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import adminRouter from "./admin/admin.routes.js";
import authRouter from "./auth/auth.routes.js";
import connectDb from "./database/connection.js";
import { protectedRoute } from "./libs/middleware/protected-route.js";
import attendenceRouter from "./attendence/attendence.route.js"
import eventRoutes from "./events/event/event.routes.js";
import uploadRouter from "./upload/upload.routes.js";
import errorHandler from "./libs/middleware/error-handler.js";

// Env Config
dotenv.config()

const app = express();
const PORT = Number(process.env.PORT) || 4000;

// Route Login 
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Image Upload Routes
app.use("/api/upload", uploadRouter)
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(process.cwd(), "public")))

// Databse Connection
await connectDb()

// Routes
app.use("/api/admin", protectedRoute, adminRouter)
app.use("/api/upload", uploadRouter)
app.use("/events", eventRoutes);
app.use("/api/attendence",protectedRoute,attendenceRouter)
app.use("/api/admin",protectedRoute, adminRouter)
app.use("/api/auth", authRouter)
app.use("/", express.static(path.join(process.cwd(), "docs")));

// To Check Services Is Healthy
app.get("/health", async (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  if (dbStatus !== 1) {
    return res.status(500).json({ status: "db not connected" });
  }
  res.status(200).json({ status: "ok" });
})

// Global Error Handling
app.use(errorHandler)

app.listen(PORT, () => {
  console.log("Server Started", PORT)
});

