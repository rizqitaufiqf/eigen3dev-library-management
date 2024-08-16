const Member = require("../models/member.model");

class MemberRepository {
  async findAll() {
    return Member.find().populate("borrowedBooks");
  }

  async findByCode(code) {
    return Member.findOne({ code }).populate("borrowedBooks");
  }
}

module.exports = new MemberRepository();
