const Member = require("../models/member.model");

class MemberRepository {
  async findAll() {
    return Member.find().populate("borrowedBooks");
  }

  async findByCode(code) {
    return Member.findOne({ code }).populate("borrowedBooks");
  }

  async setPenalize(code, penaltyUntil) {
    return Member.findOneAndUpdate({ code }, { penaltyUntil }, { new: true, runValidators: true });
  }
}

module.exports = new MemberRepository();
