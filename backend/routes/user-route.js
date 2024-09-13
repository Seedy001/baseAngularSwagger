const express = require('express');
const { addUser, getUsers, getUserById, updateUser, deleteUser } = require('../handlers/userHandle');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');




/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user management API
 */

/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Add a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               age:
 *                 type: integer
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added successfully
 *       400:
 *         description: Invalid input
 */

router.post("/users", async (req, res) => {
    let user = await addUser(req.body)
    res.send(user);

});


/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   address:
 *                     type: string
 *       500:
 *         description: Server error
 */


router.get("/users",authenticateJWT, async (req, res) => {
    let users = await getUsers()
    res.send(users);

});



/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 address:
 *                   type: string
 *       404:
 *         description: User not found
 */

router.get("/users/:id",authenticateJWT, async (req, res) => {
    console.log("id", req.params["id"])
    let user = await getUserById(req.params["id"]);
    res.send(user);

});



/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               age:
 *                 type: integer
 *               address:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 */

router.put("/users/:id",authenticateJWT, async (req, res) => {
    console.log("id", req.params["id"])
    await updateUser(req.params["id"], req.body);
    res.send({});

});



/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

router.delete("/users/:id",authenticateJWT, async (req, res) => {
    console.log("id", req.params["id"])
    await deleteUser(req.params["id"]);
    res.send({});

});

module.exports = router