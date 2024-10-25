const mongoose = require("mongoose");

// Define the Chat Schema
const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      required: true,
      ref: "User", // Reference the User model
    },
    profilePicture: {
      type: String, // Store image URLs or paths in an array
      required: false,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    idea: {
      type: String, // This can hold the chat message or idea content
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt timestamps
  }
);

// Create the model from the schema
const Chat = mongoose.model("Chat", chatSchema);

// Export the model to use it in other parts of the app
module.exports = Chat;
