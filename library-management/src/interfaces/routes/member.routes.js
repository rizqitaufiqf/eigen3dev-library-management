const express = require("express");
const router = express.Router();

memberController = require("../controllers/member.controller");

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API endpoints for managing Members.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           descripton: Id from mongodb
 *         code:
 *           type: string
 *           description: Unique identifier for the member.
 *         name:
 *           type: string
 *           description: Name of the member.
 *         penaltyUntil:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: Date until which the member has a penalty.
 *         borrowedBooks:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schemas/Book'
 *           description: List of books borrowed by the member.
 *         __v:
 *           type: integer
 *           format: int32
 *           description: version key from mongodb
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the member record was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the member record was last updated
 *       required:
 *         - code
 *         - name
 */

/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: List of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get("/", memberController.findAll);

/**
 * @swagger
 * /members/{memberCode}:
 *   get:
 *     summary: Get a member by code
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: memberCode
 *         required: true
 *         schema:
 *           type: string
 *         description: member code
 *     responses:
 *       200:
 *         description: Successfully retrieved members
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: members not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "member not found"
 */
router.get("/:memberCode", memberController.findByCode);

/**
 * @swagger
 * /members/{memberCode}/penalize:
 *   post:
 *     summary: Penalize a member
 *     tags: [Members]
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
 *               penalizeUntil:
 *                 type: string
 *                 example: "20-09-2024"
 *     responses:
 *       200:
 *         description: Member penalize successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Set penalty successfully."
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request body."
 *       404:
 *         description: Member Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Member not found."
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
router.post("/:memberCode/penalize", memberController.setPenalize);

module.exports = router;
