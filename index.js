const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");
const Post = require("./mongo/post.js");
const connectDB = require("./mongo/connect.js");

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY2,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    methods: "GET,POST,PUT,OPTIONS",
  })
);

// make this endpoint last more than 30 seconds

app.post("/GPT", async (req, res) => {
  try {
    const { model, messages } = req.body;

    const airesponse = await openai.createChatCompletion({
      model: model,
      messages: messages,
    });

    console.log(airesponse);
    res.status(200).json(airesponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});

//test with axios
app.post("/build", async (req, res) => {
  const reqbody = req.body;
  console.log(reqbody);
  const resp = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    reqbody,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY2}`,
      },
    }
  );
  // console.log(resp.data);

  res.status(200).json(resp.data);
});

app.post("/mongo", async (req, res) => {
  try {
    const { prompt, html, css, js, author } = req.body;
    console.log(prompt);

    const newPost = await Post.create({
      prompt,
      html,
      css,
      js,
      author,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
});

app.put("/mongo/:id", async (req, res) => {
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
});

app.get("/mongo/:author", async (req, res) => {
  const { author } = req.params;
  console.log(author);
  try {
    const generations = await Post.find({ author: author });
    res.status(200).json({ success: true, data: generations });
  } catch (err) {}
});

app.get("/generations", async (req, res) => {
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
});

app.get("/pagination", async (req, res) => {
  try {
    const PAGE_SIZE = 10;
    const page = parseInt(req.query.page || "0");
    const total = await Post.countDocuments({});
    const posts = await Post.find({})
      .sort({ date: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res.json({
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
});
app.get("/post/:id", async (req, res) => {
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
});

app.post("/testing-api", async (req, res) => {
  const reqbody = req.body;
  const resp = {
    id: "chatcmpl-6zMGax976eizRLamWW2M4qmib7rfD",
    object: "chat.completion",
    created: 1680081620,
    model: "gpt-3.5-turbo-0301",
    usage: {
      prompt_tokens: 145,
      completion_tokens: 896,
      total_tokens: 1041,
    },
    choices: [
      {
        message: {
          role: "assistant",
          content:
            '---starthtml---\n<div class="main-wrapper">\n  <section class="hero-section">\n    <h1>asdasd Your Dream House with Us</h1>\n    <img src="house-1.jpg" alt="House 1">\n    <img src="house-2.jpg" alt="House 2">\n    <img src="house-3.jpg" alt="House 3">\n  </section>\n  \n  <section class="form-section">\n    <h2>Enter your details to find a rental house:</h2>\n    <form>\n      <label for="name">Name:</label>\n      <input type="text" id="name">\n      \n      <label for="email">Email:</label>\n      <input type="email" id="email">\n      \n      <label for="location">Location:</label>\n      <input type="text" id="location">\n      \n      <label for="budget">Budget:</label>\n      <input type="number" id="budget">\n      \n      <button type="submit">Search</button>\n    </form>\n  </section>\n  \n  <section class="pricing-section">\n    <h2>Our Pricing:</h2>\n    <ul>\n      <li>1 BHK: $500/month</li>\n      <li>2 BHK: $800/month</li>\n      <li>3 BHK: $1200/month</li>\n    </ul>\n  </section>\n  \n  <section class="contact-section">\n    <h2>Contact Us:</h2>\n    <p>Phone No.: 1234567890</p>\n    <p>Address: 123 Main Street, City, State</p>\n    <p>Email: info@rentalhousecompany.com</p>\n  </section>\n  \n  <section class="founders-section">\n    <h2>Our Founders:</h2>\n    <div class="founder-profile">\n      <img src="founder-1.jpg" alt="Founder 1">\n      <h3>John Doe</h3>\n      <p>CEO and Co-Founder</p>\n    </div>\n    <div class="founder-profile">\n      <img src="founder-2.jpg" alt="Founder 2">\n      <h3>Jane Smith</h3>\n      <p>COO and Co-Founder</p>\n    </div>\n  </section>\n</div>\n---endhtml---\n\n---startcss---\n.main-wrapper {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.hero-section {\n  text-align: center;\n}\n\n.hero-section img {\n  width: 30%;\n  margin: 20px;\n}\n\n.form-section {\n  text-align: center;\n  margin: 50px 0;\n}\n\nform {\n  display: inline-block;\n  text-align: left;\n}\n\nlabel, input {\n  display: block;\n  margin: 10px 0;\n}\n\nbutton {\n  padding: 10px 20px;\n  background-color: #007bff;\n  color: #fff;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\nbutton:hover {\n  background-color: #0069d9;\n}\n\n.pricing-section {\n  text-align: center;\n  margin: 50px 0;\n}\n\n.pricing-section ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.pricing-section li {\n  margin: 10px 0;\n}\n\n.contact-section {\n  text-align: center;\n  margin: 50px 0;\n}\n\n.contact-section p {\n  margin: 10px 0;\n}\n\n.founders-section {\n  text-align: center;\n  margin: 50px 0;\n}\n\n.founder-profile {\n  display: inline-block;\n  margin: 10px;\n}\n\n.founder-profile img {\n  width: 100%;\n  border-radius: 50%;\n}\n\n.founder-profile h3 {\n  margin: 10px 0;\n}\n\n.founder-profile p {\n  margin: 5px 0;\n  text-transform: uppercase;\n  font-weight: bold;\n  color: #777;\n}\n---endcss---\n\n---startjs---\n// No javascript needed for this landing page\n---endjs---',
        },
        finish_reason: "stop",
        index: 0,
      },
    ],
  };

  res.status(200).json(resp);
});

const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`index.js listening on http://localhost:${port}`);
// });

// doesn't work for cyclic serverless
const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
