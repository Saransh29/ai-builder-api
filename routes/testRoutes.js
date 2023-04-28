const express = require("express");
const router = express.Router();
const {
  betaCompletion,
  createPost,
  updatePost,
  dummyCompletion,
  getPostbyId,
  getPaginatedGenerations,
  getImages,
} = require("../controllers/testController");

router.post("/test", betaCompletion);
router.post("/dummy", dummyCompletion);

router.post("/create", createPost);
router.put("/update/:id", updatePost);
router.get("/postv2/:id", getPostbyId);
router.get("/betapagination", getPaginatedGenerations);
router.get("/searchImages", getImages);
module.exports = router;
