const bookService = require("../services/book-service");

const findAll = async (req, res) => {
  try {
    const books = await bookService.findAll();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const findByCode = async (req, res) => {
  const { bookCode } = req.params;
  try {
    const book = await bookService.findByCode(bookCode);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  findAll,
  findByCode,
};
