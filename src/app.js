require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { swaggerUiExpress, swagger } = require("./infra/swagger");

const bookRoutes = require("./interfaces/routes/book.routes");
const memberRoutes = require("./interfaces/routes/member.routes");
const logRequest = require("./infra/middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(logRequest);
app.use(cookieParser());

app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swagger));
app.use("/books", bookRoutes);
app.use("/members", memberRoutes);

module.exports = app;
