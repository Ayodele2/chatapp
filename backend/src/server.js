import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import path from "path"
import { connectDB } from "./lib/db.js"

// Load environment variables
dotenv.config()

const app = express()
const __dirname = path.resolve()
const PORT = process.env.PORT || 3000

// Middleware to parse JSON, req.body
app.use(express.json())  

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

// Make ready for deployment 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT)
  connectDB()
})