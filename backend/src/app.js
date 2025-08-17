const express = require("express");
const authRoutes = require("../src/routes/auth.routes");
const cookieParesr = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParesr());

app.use("/api/auth", authRoutes);

module.exports = app;
