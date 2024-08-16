require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const { normalizePort } = require("./utils");
const logger = require("./utils/logger");

const PORT = normalizePort(process.env.PORT || 3000);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.info("Connected to Database");
    app.listen(PORT, () => {
      logger.info(`Server Listen on Port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error("Error connecting to Database:", err);
  });
