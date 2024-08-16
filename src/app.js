require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const logger = require("./utils/logger");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");

const bookRoutes = require("./routes/book.routes");
const memberRoutes = require("./routes/member.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use((req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  logger.info(`Headers: ${JSON.stringify(req.headers)}`);
  logger.info(`Body: ${JSON.stringify(req.body)}`);
  next();
});
app.use(cookieParser());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Management API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/book.routes.js", "./src/routes/member.routes.js"],
};
const swagger = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swagger));

app.use("/books", bookRoutes);
app.use("/members", memberRoutes);

module.exports = app;
