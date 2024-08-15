require("dotenv").config();
const mongoose = require("mongoose");
const Book = require("./models/book");
const { initBooks, initMembers } = require("./utils/constants");
const Member = require("./models/Member");

const initDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Book.insertMany(initBooks);
  await Member.insertMany(initMembers);

  await mongoose.connection.close();
};

initDB().catch((err) => {
  console.log("init Database error:", err);
});
