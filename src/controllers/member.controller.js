const memberService = require("../services/member.service");

const findAll = async (req, res) => {
  try {
    const members = await memberService.findAll();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findByCode = async (req, res) => {
  const { memberCode } = req.params;
  try {
    const member = await memberService.findByCode(memberCode);
    if (member) {
      res.status(200).json(member);
    } else {
      res.status(404).json({ error: "Member not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  findAll,
  findByCode,
};
