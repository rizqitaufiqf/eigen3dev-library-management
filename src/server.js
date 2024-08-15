require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const normalizePort = require("./shared/utils/normalize-port");

const PORT = normalizePort(process.env.PORT || 3000);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Server Listen on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to Database:", err);
  });
