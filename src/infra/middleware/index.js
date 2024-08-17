const logger = require("../logger");

const logRequest = (req, res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  logger.info(`Headers: ${JSON.stringify(req.headers)}`);
  logger.info(`Body: ${JSON.stringify(req.body)}`);
  next();
};

module.exports = logRequest;
