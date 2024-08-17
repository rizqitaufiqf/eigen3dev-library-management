require("dotenv").config();
const mongoose = require("mongoose");

const database = async (uri = process.env.MONGO_URI) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(uri);

    mongoose.connection.on("connected", () => {
      resolve(mongoose);
    });

    mongoose.connection.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = database;
