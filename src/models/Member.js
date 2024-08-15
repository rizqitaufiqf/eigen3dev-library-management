const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MemberSchema = new Schema(
  {
    code: String,
    name: String,
    isPenalized: { type: Boolean, default: false },
    penalizeUntil: Date,
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
