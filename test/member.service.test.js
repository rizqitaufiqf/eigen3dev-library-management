const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const BookService = require("../src/services/book.service");
const MemberService = require("../src/services/member.service");
const BookRepository = require("../src/repositories/book.repository");
const MemberRepository = require("../src/repositories/member.repository");

const Book = require("../src/models/book.model");
const Member = require("../src/models/member.model");
const { initBooks, initMembers } = require("../src/utils/constants");

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
    const member = await MemberService.findAll();
    expect(member[0]).toHaveProperty("code");
  });

  it("should get member by code", async () => {
    const memberCode = "M001";
    const member = await MemberService.findByCode(memberCode);
    expect(member).toHaveProperty("code", "M001");
  });
});
