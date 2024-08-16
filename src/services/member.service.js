const memberRepository = require("../repositories/member.repository");

class Member {
  async findAll() {
    return memberRepository.findAll();
  }

  async findByCode(code) {
    return memberRepository.findByCode(code);
  }

  async setPenalize(memberCode, penaltyUntil) {
    const [day, month, year] = penaltyUntil.split("-");
    const penaltyDate = new Date(year, month - 1, day);
    penaltyDate.setHours(23, 59, 59, 999);

    return memberRepository.setPenalize(memberCode, penaltyDate);
  }
}

module.exports = new Member();
