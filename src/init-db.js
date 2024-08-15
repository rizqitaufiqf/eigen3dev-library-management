require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/book-model");
const Member = require("./models/member-model");
const { initBooks, initMembers } = require("./utils/constants");

const initDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Book.insertMany(initBooks);
  await Member.insertMany(initMembers);

  await mongoose.connection.close();
};

initDB().catch((err) => {
  console.log("init Database error:", err);
});
