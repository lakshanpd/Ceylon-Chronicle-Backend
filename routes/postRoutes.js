const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/post", postController.createPost);
router.post("/getPosts", postController.getUserPosts);
router.get("/getAllPosts", postController.getAllPosts);

module.exports = router;
