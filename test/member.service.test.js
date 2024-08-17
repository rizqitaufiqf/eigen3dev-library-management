const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const memberService = require("../src/domains/member/services/member.service");

const Book = require("../src/domains/book/models/book.model");
const Member = require("../src/domains/member/models/member.model");
const { initBooks, initMembers } = require("../src/infra/utils/constants");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  await Book.insertMany(initBooks);
  await Member.insertMany(initMembers);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Member Service", () => {
  it("should get all members", async () => {
    const member = await memberService.findAll();
    expect(member[0]).toHaveProperty("code");
  });

  it("should get member by code", async () => {
    const memberCode = "M001";
    const member = await memberService.findByCode(memberCode);
    expect(member).toHaveProperty("code", "M001");
  });

  it("should penalize a member", async () => {
    const memberCode = "M001";
    const penalizeUntil = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
    const member = await memberService.setPenalize(memberCode, penalizeUntil);
    expect(member.penaltyUntil).not.toEqual(null);
  });
});
