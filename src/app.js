require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const bookRoutes = require("./routes/book-routes");
const memberRoutes = require("./routes/member-routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());

app.use("/books", bookRoutes);
app.use("/members", memberRoutes);

module.exports = app;
