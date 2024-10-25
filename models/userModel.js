const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true, // first name is required
      trim: true,
    },
    lastName: {
      type: String,
      required: true, // last name is required
      trim: true,
    },
    birthday: {
      type: Date, // storing the birthday as a Date
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // email should be unique
      lowercase: true,
      trim: true,
    },
    travelWith: {
      type: String, // e.g., group, solo, family
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true, // username should be unique
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String, // Store image URLs or paths in an array
      required: false,
    },
    facebook: {
      type: String, // Facebook URL or ID
      required: false,
    },
    instagram: {
      type: String, // Twitter URL or ID
      required: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt timestamps
  }
);

// Create the model from the schema
const User = mongoose.model("User", userSchema);

// Export the model to use it in other parts of the app
module.exports = User;
