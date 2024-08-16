const memberService = require("../services/member.service");
const { isValidDate } = require("../utils");

const findAll = async (req, res) => {
  try {
    const members = await memberService.findAll();
    return res.status(200).json(members);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const findByCode = async (req, res) => {
  const { memberCode } = req.params;
  try {
    const member = await memberService.findByCode(memberCode);
    if (member) {
      return res.status(200).json(member);
    }
    return res.status(404).json({ error: "Member not found." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const setPenalize = async (req, res) => {
  const { memberCode } = req.params;
  const { penalizeUntil } = req.body;
  if (!isValidDate(penalizeUntil)) {
    return res.status(400).json({ message: "Invalid request body." });
  }

  try {
    const member = await memberService.setPenalize(memberCode, penalizeUntil);
    if (member) {
      res.status(200).json({ message: "Set penalty successfully." });
    }
    return res.status(404).json({ error: "Member not found." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  findAll,
  findByCode,
  setPenalize,
};
