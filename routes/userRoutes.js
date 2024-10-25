const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Import the user controller
const authenticateToken = require("../middlewares/authenticateToken"); // Import the authentication middleware

// POST route to create a new user
router.post("/register", userController.createUser); // Route for user registration
router.post("/login", userController.validateUser); // Route for user login
router.get("/myinfo", authenticateToken, userController.getMyInfo); // Protected route for user info
router.post("/updateUserDetails", userController.updateUserDetails);

module.exports = router;
