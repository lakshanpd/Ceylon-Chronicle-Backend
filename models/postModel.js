const mongoose = require("mongoose");

// Define the Post Schema
const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true, // Each post must be associated with a user
    },
    topic: {
      type: String,
      required: true,
      trim: true, // Trim whitespace
    },
    tags: {
      type: [String], // Array of tags for the post
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: false, // Trim whitespace
    },
    images: {
      type: [String], // Store image URLs or paths in an array
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt timestamps
  }
);

// Create the model from the schema
const Post = mongoose.model("Post", postSchema);

// Export the model to use it in other parts of the app
module.exports = Post;
