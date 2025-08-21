const express = require("express");
const authRoutes = require("../src/routes/auth.routes");
const postRoutes = require("../src/routes/post.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// ✅ Configure CORS properly
app.use(cors({
  origin: "http://localhost:5173", // frontend (Vite) URL
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
