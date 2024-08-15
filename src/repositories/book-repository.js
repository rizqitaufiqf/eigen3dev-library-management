const Book = require("../models/book-model");

class BookRepository {
  async findAll() {
    return Book.find({ borrowedBy: null, stock: { $gt: 0 } }, "-__v -_id");
  }

  async findByCode(code) {
    return Book.findOne({ code }, "-__v -_id");
  }
}

module.exports = new BookRepository();
