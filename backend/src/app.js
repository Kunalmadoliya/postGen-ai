const express = require("express");
const authRoutes = require("../src/routes/auth.routes");
const postRoutes = require("../src/routes/post.routes")
const cookieParesr = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParesr());

app.use("/api/auth", authRoutes);
app.use("/api/post" , postRoutes)

module.exports = app;
