const memberRepository = require("../repositories/member.repository");

class Member {
  async findAll() {
    return memberRepository.findAll();
  }

  async findByCode(code) {
    return memberRepository.findByCode(code);
  }
}

module.exports = new Member();
