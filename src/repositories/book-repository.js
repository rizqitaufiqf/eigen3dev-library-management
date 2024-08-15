const Book = require("../models/book-model");

class BookRepository {
  async findAll() {
    return Book.find({ borrowedBy: null, stock: { $gt: 0 } });
  }

  async findByCode(code) {
    return Book.findOne({ code });
  }
}

module.exports = new BookRepository();
