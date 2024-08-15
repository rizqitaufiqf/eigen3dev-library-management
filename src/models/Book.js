const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    code: String,
    title: String,
    author: String,
    stock: Number,
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
    borrowedDate: Date,
    returnedDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
