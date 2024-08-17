require("dotenv").config();
const mongoose = require("mongoose");
const { initBooks, initMembers } = require("../utils/constants");
const bookModel = require("../../domains/book/models/book.model");
const memberModel = require("../../domains/member/models/member.model");
const logger = require("../logger");

const initDB = async (uri = process.env.MONGO_URI) => {
  try {
    await mongoose.connect(uri);

    await bookModel.insertMany(initBooks);
    await memberModel.insertMany(initMembers);

    logger.info("Database initialized successfully");

    // Close the connection if running standalone (ex: npm run init-db)
    if (process.env.RUN_MODE === "standalone") {
      await mongoose.connection.close();
    }
  } catch (err) {
    logger.error("Error initializing the database:", err);
    throw err;
  }
};

if (require.main === module) {
  process.env.RUN_MODE = "standalone";
  initDB().catch((err) => {
    process.exit(1);
  });
}

module.exports = { initDB };
