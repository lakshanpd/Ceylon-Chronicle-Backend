// controllers/userController.js

const User = require("../models/userModel"); // assuming you have user model in models folder
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    console.log("not destructured");
    const {
      firstName,
      lastName,
      birthday,
      email,
      travelWith,
      username,
      password,
      profilePicture,
      facebook,
      instagram,
    } = req.body;

    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds); // Hash the password

    const userData = {
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      email: email,
      travelWith: travelWith,
      username: username,
      password: hashedPassword,
      profilePicture: profilePicture,
      facebook: facebook,
      instagram: instagram,
    };

    const newUser = new User(userData); // Create a new user from request body

    await newUser.save(); // Save the new user to the database

    const responseUser = {
      _id: newUser._id, // Include the _id field
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      birthday: newUser.birthday,
      email: newUser.email,
      travelWith: newUser.travelWith,
      username: newUser.username,
      profilePicture: newUser.profilePicture,
      facebook: newUser.facebook,
      instagram: newUser.instagram,
    };

    res.status(201).json(responseUser);
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

// Secret key for signing the JWT (store it in environment variables in production)
const SECRET_KEY = "your_secret_key";
exports.validateUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // If the password is correct, generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username }, // Payload
      SECRET_KEY, // Secret key
      { expiresIn: "30m" } // Token expiration (10 minutes)
    );

    // Prepare user data to send in response
    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      email: user.email,
      travelWith: user.travelWith,
      username: user.username,
      profilePicture: user.profilePicture,
      facebook: user.facebook,
      instagram: user.instagram,
    };

    // Return the token and user data to the client
    res.status(200).json({
      message: "Login successfully",
      token, // Include the token in the response
      data: userData, // Include user details in the response
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyInfo = async (req, res) => {
  try {
    const { id } = req.user; // `req.user` is set in the middleware after token verification

    // Find user in the database by ID
    const user = await User.findById(id).select("username email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user's information
    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const { _id, firstName, lastName, birthday, travelWith, profilePicture } =
      req.body;
    console.log(req.body);

    // Construct the updated user data
    const updatedData = {
      firstName,
      lastName,
      birthday,
      travelWith,
      profilePicture,
    };

    // Find the user by ID and update their details
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $set: updatedData }, // Update only the provided fields
      { new: true } // Return the updated user document
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch the full user details after the update
    const fullUserDetails = await User.findById(_id);

    // Respond with the complete user data
    res.status(200).json(fullUserDetails);
  } catch (error) {
    res.status(500).json({ message: "Error updating user details", error });
  }
};
