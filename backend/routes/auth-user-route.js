const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');

const authCtrl = require('../handlers/authHandle');



/**
 * @swagger
 * tags:
 *   name: Login
 *   description: The login management API
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     tags: [Login]
 *     summary: Signup a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mypassword
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request, user already exists or validation error
 *       500:
 *         description: Server error
 */
router.post('/signup',authenticateJWT, authCtrl.signup);

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Login]
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: mypassword
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/home',authenticateJWT, authCtrl.login);

module.exports = router;