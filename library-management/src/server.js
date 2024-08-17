require("dotenv").config();
const app = require("./app");
const { normalizePort } = require("./infra/utils");
const database = require("./infra/database");
const logger = require("./infra/logger");
const { initDB } = require("./infra/database/init-db");

const PORT = normalizePort(process.env.PORT || 3000);

database(process.env.MONGO_URI)
  .then(() => {
    logger.info("Connected to Database.");
    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}.`);
    });
  })
  .catch((err) => {
    logger.error("Error during startup:", err);
  });
