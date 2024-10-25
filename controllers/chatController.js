const Chat = require("../models/chatModel");

exports.createChat = async (req, res) => {
  try {
    const { userId, profilePicture, username, firstName, lastName, idea } =
      req.body;

    const chatData = {
      userId: userId,
      profilePicture: profilePicture,
      username: username,
      firstName: firstName,
      lastName: lastName,
      idea: idea,
    };

    const newChat = new Chat(chatData);
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: "Error saving chat", error });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const allChats = await Chat.find(); // Assuming 'Chat' is a model from your database

    // Send back a success response with all chat data
    res.status(200).json(allChats);
  } catch (error) {
    console.error("Error fetching chats:", error);

    // Send an error response if something goes wrong
    res.status(500).json({ error: "An error occurred while fetching chats" });
  }
};
