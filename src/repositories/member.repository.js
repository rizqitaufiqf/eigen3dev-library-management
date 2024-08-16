const Member = require("../models/member.model");

class MemberRepository {
  async findAll() {
    return Member.find().populate("borrowedBooks");
  }

  async findByCode(code) {
    return Member.findOne({ code }).populate("borrowedBooks");
  }

  async setPenalize(memberCode, penaltyUntil) {
    return Member.findOneAndUpdate({ code: memberCode }, { penaltyUntil });
  }
}

module.exports = new MemberRepository();
