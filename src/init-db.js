require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/book.model");
const Member = require("./models/member.model");
const { initBooks, initMembers } = require("./utils/constants");
const logger = require("./utils/logger");

const initDB = async (uri = process.env.MONGO_URI) => {
  await mongoose.connect(uri);

  await Book.insertMany(initBooks);
  await Member.insertMany(initMembers);

  await mongoose.connection.close();
};

initDB().catch((err) => {
  logger.error("init Database error:", err);
});

module.exports = { initDB };
