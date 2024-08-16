const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    penaltyUntil: {
      type: Date,
      default: null,
    },
    borrowedBooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", MemberSchema);
