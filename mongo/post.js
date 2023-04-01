const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  prompt: { type: String, required: true },
  html: { type: String, required: true },
  css: { type: String, required: true },
  js: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: String },
});

const PostSchema = mongoose.model("Post", Post);

module.exports = PostSchema;
