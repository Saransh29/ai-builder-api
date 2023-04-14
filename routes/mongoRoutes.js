const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  getPostsByAuthor,
  getGenerations,
  getPaginatedGenerations,
  getPostById,
} = require("../controllers/mongoController");

router.post("/mongo", createPost);
router.put("/mongo/:id", updatePost);
router.get("/mongo/:author", getPostsByAuthor);
router.get("/generations", getGenerations);
router.get("/pagination", getPaginatedGenerations);
router.get("/post/:id", getPostById);

module.exports = router;
