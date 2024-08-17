const bookService = require("../../domains/book/services/book.service");
const memberService = require("../../domains/member/services/member.service");

const findAll = async (req, res) => {
  try {
    const books = await bookService.findAll();
    return res.status(200).json(books);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const findByCode = async (req, res) => {
  try {
    const book = await bookService.findByCode(req.params.bookCode);
    if (book) {
      return res.status(200).json(book);
    }
    return res.status(404).json({ message: "Book not found." });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const borrowBook = async (req, res) => {
  try {
    const member = await memberService.findByCode(req.params.memberCode);
    if (!member) throw new Error("Member not found.");

    const book = await bookService.borrowBook(member, req.body.bookCode);
    return res.status(200).json({ message: "Book borrowed successfully.", data: book });
  } catch (err) {
    if (err.message.includes("Book") || err.message.includes("Member")) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

const returnBook = async (req, res) => {
  try {
    const member = await memberService.findByCode(req.params.memberCode);
    if (!member) throw new Error("Member not found.");

    const book = await bookService.returnBook(member, req.body.bookCode);
    return res.status(200).json({ message: "Book returned successfully.", data: book });
  } catch (err) {
    if (err.message.includes("Book") || err.message.includes("Member")) {
      return res.status(400).json({ message: err.message });
    }
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  findAll,
  findByCode,
  borrowBook,
  returnBook,
};
