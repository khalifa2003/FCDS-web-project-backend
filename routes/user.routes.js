const express = require("express");
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changeUserPasswordValidator,
  updateLoggedUserValidator,
} = require("../utils/validators/user.validator");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changeUserPassword,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserData,
  deleteLoggedUserData,
} = require("../controllers/user.controller");

const authController = require("../controllers/auth.controller");
const router = express.Router();

router.use(authController.protect);

/**
 * @swagger
 * /users/getMe:
 *   get:
 *     summary: Get logged user data
 *     description: Retrieve data for the currently logged-in user.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: The logged-in user's data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get("/getMe", getLoggedUserData, getUser);
router.put("/changeMyPassword", updateLoggedUserPassword);

/**
 * @swagger
 * /users/updateMe:
 *   put:
 *     summary: Update logged user data
 *     description: Update the details of the currently logged-in user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully.
 */
router.put("/updateMe", updateLoggedUserValidator, updateLoggedUserData);

/**
 * @swagger
 * /users/deleteMe:
 *   delete:
 *     summary: Delete logged user account
 *     description: Remove the currently logged-in user's account from the system.
 *     tags:
 *       - Users
 *     responses:
 *       204:
 *         description: Account deleted successfully.
 */
router.delete("/deleteMe", deleteLoggedUserData);

// Admin
router.use(authController.allowedTo("admin", "manager"));
/**
 * @swagger
 * /users/changePassword/{id}:
 *   put:
 *     summary: Change a user's password
 *     description: Change the password of a user by their ID. Admin or Manager access required.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose password will be changed.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password.
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password changed successfully.
 */
router.put(
  "/changePassword/:id",
  changeUserPasswordValidator,
  changeUserPassword
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users. Accessible only to admins or managers.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the system.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully.
 */
router.route("/").get(getUsers).post(createUserValidator, createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a specific user
 *     description: Retrieve a user by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: The requested user data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *   put:
 *     summary: Update a specific user
 *     description: Update the details of a specific user by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully.
 *   delete:
 *     summary: Delete a specific user
 *     description: Remove a user from the system by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     responses:
 *       204:
 *         description: User deleted successfully.
 */
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
