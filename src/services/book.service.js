const bookRepository = require("../repositories/book.repository");

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

  async returnBook(member, bookCode) {
    const book = await bookRepository.findByCode(bookCode);
    const isValidBorrowedBooks = member.borrowedBooks.find((item) => item._id.equals(book._id));
    if (!book || isValidBorrowedBooks === undefined) {
      throw new Error("Member has not borrowed this book.");
    }

    const now = new Date();
    const borrowedDate = new Date(book.borrowedDate);
    const diffDays = (now - borrowedDate) / (1000 * 60 * 60 * 24);

    if (diffDays > 7) {
      member.penaltyUntil = new Date(now.setDate(now.getDate() + 3));
    }

    member.borrowedBooks.pull(book);
    book.borrowedBy = null;
    book.borrowedDate = null;
    book.stock += 1;

    await Promise.all([book.save(), member.save()]);

    return book;
  }
}

module.exports = new BookService();
