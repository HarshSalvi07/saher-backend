import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import uploadRouter from "./upload/upload.routes";

// Env Config
dotenv.config()

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Routes
app.use("/api/upload", uploadRouter)

app.get("/", (req, res) => {
  res.status(200).json("This Is Saher Internal Home Page")
})


app.listen(port, () => {
  console.log("Server Started", port)
})
