import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import uploadRouter from "./upload/upload.routes.js";
import path from "path";
import connectDb from "./database/connection.js";
import authRouter from "./auth/auth.routes.js";

// Env Config
dotenv.config()

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(process.cwd(), "public")))

// Databse Connection
await connectDb()

// Routes
app.use("/api/upload", uploadRouter)
app.use("/api/auth",authRouter)
app.use("/", express.static(path.join(process.cwd(), "docs")));

app.listen(port, () => {
  console.log("Server Started", port)
})
