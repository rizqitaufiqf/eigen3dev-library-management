const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    borrowedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      default: null,
    },
    borrowedDate: Date,
    returnedDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
