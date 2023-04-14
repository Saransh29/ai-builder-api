const Post = require("../mongo/post");

const retry = async (fn, maxRetries, delayMs) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
};

const createPostWithRetry = async (req) => {
  const { prompt, html, css, js, author } = req.body;
  console.log("---Uploading---", prompt);

  const newPost = await Post.create({
    prompt,
    html,
    css,
    js,
    author,
  });

  return newPost;
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await retry(() => createPostWithRetry(req), 3, 1000);
    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    const { prompt } = req.body;
    console.log("---failed to upload---", prompt);
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
};
/*
exports.createPost = async (req, res) => {
  try {
    const { prompt, html, css, js, author } = req.body;
    console.log("---Uploading---", prompt);

    const newPost = await Post.create({
      prompt,
      html,
      css,
      js,
      author,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    const { prompt } = req.body;
    console.log("---failed to upload---", prompt);
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
};
*/

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { prompt, html, css, js } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(id, {
      prompt,
      html,
      css,
      js,
    });
    res.status(200).json({ success: true, data: { prompt, html, css, js } });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to update a post, please try again",
    });
  }
};

exports.getPostsByAuthor = async (req, res) => {
  const { author } = req.params;
  // console.log(author);
  try {
    const generations = await Post.find({ author: author }).sort({ date: -1 });
    res.status(200).json({ success: true, data: generations });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch your posts, please try again",
    });
  }
};

exports.getGenerations = async (req, res) => {
  try {
    // const generations = await Post.find();
    // get generations sorted by date
    const generations = await Post.find().sort({ date: -1 });

    res.status(200).json({ success: true, data: generations });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to get generations, please try again",
    });
  }
};

exports.getPaginatedGenerations = async (req, res) => {
  try {
    const PAGE_SIZE = 12;
    const page = parseInt(req.query.page || "0");
    const total = await Post.countDocuments({});
    const posts = await Post.find({})
      .sort({ date: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({
      total: total,
      totalPages: Math.ceil(total / PAGE_SIZE),
      data: posts,
    });

    // const generations = await Post.find().sort({ date: -1 });

    // res.status(200).json({ success: true, data: generations });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to get generations, please try again",
    });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const posts = await Post.find({ _id: id });
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to get posts, please try again",
    });
  }
};
