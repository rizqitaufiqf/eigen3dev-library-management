const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const BookService = require("../src/services/book.service");
const MemberService = require("../src/services/member.service");

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

describe("Book Service", () => {
  it("should get all available book", async () => {
    const books = await BookService.findAll();
    expect(books[0]).toHaveProperty("code");
  });

  it("should get book by code", async () => {
    const bookCode = "JK-45";
    const book = await BookService.findByCode(bookCode);
    expect(book).toHaveProperty("code", "JK-45");
  });

  it("should borrow a book for a member", async () => {
    const memberCode = "M001";
    const bookCode = "JK-45";
    const member = await MemberService.findByCode(memberCode);

    const borrowedBook = await BookService.borrowBook(member, bookCode);
    expect(borrowedBook.borrowedBy.toString()).toEqual(member._id.toString());
  });

  it("should not allow a member to borrow more than 2 books", async () => {
    const memberCode = "M002";
    const member = await MemberService.findByCode(memberCode);

    await BookService.borrowBook(member, "SHR-1");
    await BookService.borrowBook(member, "TW-11");

    await expect(BookService.borrowBook(member, "HOB-83")).rejects.toThrow(
      "Member cannot borrow more than 2 books."
    );
  });

  it("should return a book", async () => {
    const memberCode = "M001";
    const bookCode = "JK-45";
    const member = await MemberService.findByCode(memberCode);

    const borrowedBook = await BookService.returnBook(member, bookCode);
    expect(borrowedBook.borrowedBy).toEqual(null);
  });
});
