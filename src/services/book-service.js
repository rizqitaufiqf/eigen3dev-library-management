const bookRepository = require("../repositories/book-repository");

class BookService {
  async findAll() {
    return bookRepository.findAll();
  }

  async findByCode(code) {
    return bookRepository.findByCode(code);
  }
}

module.exports = new BookService();
