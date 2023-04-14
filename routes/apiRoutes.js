const express = require("express");
const router = express.Router();
const {
  createChatCompletion,
  build,
  testingApi,
} = require("../controllers/apiController");

router.post("/GPT", createChatCompletion);
router.post("/build", build);
router.post("/testing-api", testingApi);

module.exports = router;
