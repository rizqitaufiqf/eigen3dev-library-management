const bookRepository = require("../repositories/book-repository");

class BookService {
  async findAll() {
    return bookRepository.findAll();
  }

  async findByCode(code) {
    return bookRepository.findByCode(code);
  }

  async borrowBook(member, bookCode) {
    const book = await bookRepository.findByCode(bookCode);

    if (!book || book.stock <= 0) throw new Error("Book is not available.");
    if (book.borrowedBy) throw new Error("The Book is already borrowed.");
    if (member.borrowedBooks.length >= 2)
      throw new Error("Member cannot borrow more than 2 books.");

    const now = new Date();
    if (member.penaltyUntil && member.penaltyUntil > now)
      throw new Error("Member is penalized and cannot borrow books.");

    book.borrowedBy = member._id;
    book.borrowedDate = now;
    book.stock -= 1;

    member.borrowedBooks.push(book._id);

    await Promise.all([book.save(), member.save()]);

    return book;
  }
}

module.exports = new BookService();
