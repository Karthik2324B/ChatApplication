import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url"; // ✅ for __dirname in ESM

import { app, server } from "./SocketIO/server.js";

import cors from "cors";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";

dotenv.config();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// env variables
const port = process.env.PORT || 4002;
const mongodb_url = process.env.MONGODB_URL;

// MongoDB connection
try {
  mongoose.connect(mongodb_url);
  console.log("✅ Connected to mongoDB successfully");
} catch (error) {
  console.log("❌ Error while connecting to mongoDB", error);
}

// routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// ✅ Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get("/.*/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

// test route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
