const express = require("express");
const router = express.Router();

bookController = require("../controllers/book.controller");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           descripton: Id from mongodb
 *         code:
 *           type: string
 *           description: Unique code for the book
 *         title:
 *           type: string
 *           description: Title of the book
 *         author:
 *           type: string
 *           description: Author of the book
 *         stock:
 *           type: integer
 *           format: int32
 *           description: Number of books in stock
 *         borrowedBy:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           description: ID of the member who borrowed the book (optional)
 *         __v:
 *           type: integer
 *           format: int32
 *           description: version key from mongodb
 *         borrowedDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Date when the book was borrowed (optional)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the book record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the book record was last updated
 *       required:
 *         - code
 *         - title
 *         - author
 *         - stock
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get available books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get("/", bookController.findAll);

/**
 * @swagger
 * /books/{bookCode}:
 *   get:
 *     summary: Get a book by code
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Book code
 *     responses:
 *       200:
 *         description: Successfully retrieved Books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Books not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book not found"
 */
router.get("/:bookCode", bookController.findByCode);

/**
 * @swagger
 * /books/{memberCode}/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: memberCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Member Code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookCode:
 *                 type: string
 *                 example: "TW-11"
 *     responses:
 *       200:
 *         description: Book borrowed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book borrowed successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book is not available."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
router.post("/:memberCode/borrow", bookController.borrowBook);

/**
 * @swagger
 * /books/{memberCode}/return:
 *   post:
 *     summary: Return a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: memberCode
 *         required: true
 *         schema:
 *           type: string
 *         description: Member Code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookCode:
 *                 type: string
 *                 example: "TW-11"
 *     responses:
 *       200:
 *         description: Book returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book returned successfully."
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Member has not borrowed this book."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */
router.post("/:memberCode/return", bookController.returnBook);

module.exports = router;
