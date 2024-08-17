const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const bookService = require("../src/domains/book/services/book.service");
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

describe("Book Service", () => {
  it("should get all available book", async () => {
    const books = await bookService.findAll();
    expect(books[0]).toHaveProperty("code");
  });

  it("should get book by code", async () => {
    const bookCode = "JK-45";
    const book = await bookService.findByCode(bookCode);
    expect(book).toHaveProperty("code", "JK-45");
  });

  it("should borrow a book for a member", async () => {
    const memberCode = "M001";
    const bookCode = "JK-45";
    const member = await memberService.findByCode(memberCode);

    const borrowedBook = await bookService.borrowBook(member, bookCode);
    expect(borrowedBook.borrowedBy.toString()).toEqual(member._id.toString());
  });

  it("should not allow a member to borrow more than 2 books", async () => {
    const memberCode = "M002";
    const member = await memberService.findByCode(memberCode);

    await bookService.borrowBook(member, "SHR-1");
    await bookService.borrowBook(member, "TW-11");

    await expect(bookService.borrowBook(member, "HOB-83")).rejects.toThrow(
      "Member cannot borrow more than 2 books."
    );
  });

  it("should not allow a member to borrow if being penalize", async () => {
    const memberCode = "M003";
    const bookCode = "NRN-7";

    // penalize member
    const penalizeUntil = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
    await memberService.setPenalize(memberCode, penalizeUntil);

    const member = await memberService.findByCode(memberCode);
    await expect(bookService.borrowBook(member, bookCode)).rejects.toThrow(
      "Member is penalized and cannot borrow books."
    );
  });

  it("should return a book", async () => {
    const memberCode = "M001";
    const bookCode = "JK-45";
    const member = await memberService.findByCode(memberCode);

    const borrowedBook = await bookService.returnBook(member, bookCode);
    expect(borrowedBook.borrowedBy).toEqual(null);
  });

  it("should not return a book that member not borrowed", async () => {
    const memberCode = "M001";
    const bookCode = "SHR-1";

    const member = await memberService.findByCode(memberCode);
    await expect(bookService.returnBook(member, bookCode)).rejects.toThrow(
      "Member has not borrowed this book."
    );
  });
});
