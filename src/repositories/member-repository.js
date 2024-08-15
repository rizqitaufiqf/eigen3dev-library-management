const Member = require("../models/member-model");

class MemberRepository {
  async findAll() {
    return Member.find({}, "-__v -_id");
  }

  async findByCode(code) {
    return Member.findOne({ code }, "-__v -_id");
  }
}

module.exports = new MemberRepository();
