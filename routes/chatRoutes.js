const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.post("/sendChat", chatController.createChat);
router.get("/getAllChats", chatController.getAllChats);

module.exports = router;
