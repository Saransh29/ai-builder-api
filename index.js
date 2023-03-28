const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(
  cors({
    origin: "https://ai-builder-gules.vercel.app",
    // origin: "http://localhost:3000",
    methods: "GET,POST,OPTIONS",
    // allowedHeaders: ["Content-Type", "Authorization"],
    // maxAge: 600,

    // preflightContinue: false,
    // optionsSuccessStatus: 204,
  })
);

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

app.post("/testing-api", async (req, res) => {
  const reqbody = req.body;
  const resp2 = {
    id: "chatcmpl-6zBDnu0jM8gpdgpVuWdLVWDO7yD1m",
    object: "chat.completion",
    created: 1680039163,
    model: "gpt-3.5-turbo-0301",
    usage: {
      prompt_tokens: 108,
      completion_tokens: 690,
      total_tokens: 798,
    },
    choices: [
      {
        message: {
          role: "assistant",
          content:
            'I\'m sorry, as an AI language model, I cannot perform web development tasks. However, I can provide you with a sample HTML code for a singing competition landing page that you can use as a reference:\n\n\n---starthtml---\n\n<!DOCTYPE html>\n<html>\n\n  <head>\n    <title>Singing Competition Landing Page</title>\n    \n    ---startcss---\n    /* Add your CSS code here */\n    body {\n      background-color: #f8f8f8;\n      font-family: Arial, sans-serif;\n      font-size: 16px;\n      color: #444444;\n    }\n    \n    .header {\n      background-color: #202020;\n      color: #ffffff;\n      padding: 20px;\n      text-align: center;\n    }\n    \n    .logo {\n      font-size: 30px;\n    }\n    \n    .subheader {\n      font-size: 20px;\n      margin-top: 30px;\n      text-align: center;\n    }\n    \n    .competition-description {\n      margin-top: 30px;\n      margin-bottom: 30px;\n      padding: 10px;\n      text-align: justify;\n    }\n    \n    .btn {\n      background-color: #ff2851;\n      color: #ffffff;\n      border: none;\n      padding: 10px 20px;\n      font-size: 16px;\n      cursor: pointer;\n      border-radius: 5px;\n    }\n    \n    .btn:hover {\n      background-color: #ffffff;\n      color: #ff2851;\n      border: 1px solid #ff2851;\n    }\n    \n    .footer {\n      background-color: #202020;\n      color: #ffffff;\n      padding: 20px;\n      text-align: center;\n      font-size: 14px;\n    }\n    \n    ---endcss---\n    \n  </head>\n\n  <body>\n    <div class="header">\n      <h1 class="logo">Singing Competition</h1>\n    </div>\n    \n    <div class="subheader">\n      <p>Are you the next singing superstar?</p>\n      <p>Enter our competition now and showcase your talent!</p>\n    </div>\n    \n    <div class="competition-description">\n      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus finibus elementum. Sed ut sapien sodales, suscipit turpis vel, volutpat velit. Nam faucibus, eros at tempus tristique, mi tortor sodales ante, eu malesuada nulla ipsum ut sapien.</p>\n      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus finibus elementum. Sed ut sapien sodales, suscipit turpis vel, volutpat velit. Nam faucibus, eros at tempus tristique, mi tortor sodales ante, eu malesuada nulla ipsum ut sapien.</p>\n      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n    </div>\n    \n    <div class="btn-container">\n      <button class="btn">Enter now!</button>\n    </div>\n    \n    <div class="footer">\n      <p>Copyright © 2022 Singing Competition</p>\n    </div>\n    \n  </body>\n\n</html>\n\n---endhtml---',
        },
        finish_reason: "stop",
        index: 0,
      },
    ],
  };
  const resp = {
    id: "chatcmpl-6zB75EAQHabCUnZG1wL5jZN5XbybE",
    object: "chat.completion",
    created: 1680038747,
    model: "gpt-3.5-turbo-0301",
    usage: {
      prompt_tokens: 109,
      completion_tokens: 1413,
      total_tokens: 1522,
    },
    choices: [
      {
        message: {
          role: "assistant",
          content:
            'Here is an example of a shark hunting landing page without the HTML, HEAD, BODY, and SCRIPT tags as requested. The HTML code is wrapped between the `---starthtml---` and `---endhtml---` tags, the CSS code is wrapped between the `---startcss---` and `---endcss---` tags, and the JavaScript code is wrapped between the `---startjs---` and `---endjs---` tags.\n\n---starthtml---\n<div class="header">\n  <h1>Shark Hunting Adventures</h1>\n  <nav>\n    <ul>\n      <li><a href="#">Home</a></li>\n      <li><a href="#">About Us</a></li>\n      <li><a href="#">Gallery</a></li>\n      <li><a href="#">Contact</a></li>\n    </ul>\n  </nav>\n</div>\n\n<main>\n  <section class="banner">\n    <h2>Experience the Thrill of Shark Hunting</h2>\n    <p>Get up close and personal with some of the most fascinating creatures in the ocean.</p>\n    <a href="#" class="cta-button">Book Your Adventure</a>\n  </section>\n\n  <section class="features">\n    <div class="feature">\n      <img src="shark-fin.png" alt="Shark Fin">\n      <h3>Explore the Deep</h3>\n      <p>Discover the hidden wonders of the ocean and the amazing creatures that call it home.</p>\n    </div>\n\n    <div class="feature">\n      <img src="shark-cage.png" alt="Shark Cage">\n      <h3>Safe and Secure</h3>\n      <p>Experience the thrill of shark hunting in a safe and controlled environment.</p>\n    </div>\n\n    <div class="feature">\n      <img src="shark-trophy.png" alt="Shark Trophy">\n      <h3>Take Home a Trophy</h3>\n      <p>Show off your hunting prowess with a trophy from your adventure.</p>\n    </div>\n  </section>\n\n  <section class="testimonial">\n    <blockquote>"Shark hunting with these guys was an incredible experience. They know how to make you feel safe while still getting your adrenaline pumping. I would definitely recommend them to anyone looking for an adventure."</blockquote>\n    <cite>John D.</cite>\n  </section>\n</main>\n\n<footer>\n  <div class="footer-nav">\n    <ul>\n      <li><a href="#">Home</a></li>\n      <li><a href="#">About Us</a></li>\n      <li><a href="#">Gallery</a></li>\n      <li><a href="#">Contact</a></li>\n    </ul>\n  </div>\n\n  <div class="footer-social">\n    <a href="#"><img src="facebook.png" alt="Facebook"></a>\n    <a href="#"><img src="twitter.png" alt="Twitter"></a>\n    <a href="#"><img src="instagram.png" alt="Instagram"></a>\n  </div>\n\n  <div class="footer-info">\n    <p>Shark Hunting Adventures &copy; 2021</p>\n  </div>\n</footer>\n---endhtml---\n\n---startcss---\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: Arial, sans-serif;\n}\n\n.header {\n  background-color: #333;\n  color: #fff;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 1rem;\n}\n\n.header h1 {\n  font-size: 2rem;\n  margin: 0;\n}\n\n.header nav ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.header nav li {\n  display: inline-block;\n  margin-right: 1rem;\n}\n\n.header nav a {\n  color: #fff;\n  text-decoration: none;\n}\n\n.banner {\n  background-image: url(\'shark-banner.jpg\');\n  background-size: cover;\n  height: 500px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n}\n\n.banner h2 {\n  font-size: 3rem;\n  color: #fff;\n  margin: 0;\n}\n\n.banner p {\n  font-size: 1.5rem;\n  color: #fff;\n  margin: 0 0 2rem 0;\n}\n\n.cta-button {\n  background-color: #f1c40f;\n  color: #333;\n  padding: 1rem 2rem;\n  border-radius: 2rem;\n  text-decoration: none;\n  font-weight: bold;\n}\n\n.features {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem;\n}\n\n.feature {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  margin-right: 1rem;\n}\n\n.feature img {\n  width: 150px;\n  margin-bottom: 1rem;\n}\n\n.feature h3 {\n  font-size: 2rem;\n  margin: 0;\n}\n\n.feature p {\n  font-size: 1.2rem;\n}\n\n.testimonial {\n  background-color: #333;\n  color: #fff;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 2rem;\n}\n\n.testimonial blockquote {\n  font-size: 2rem;\n  margin: 0;\n}\n\n.testimonial cite {\n  font-size: 1.5rem;\n}\n\n.footer {\n  background-color: #333;\n  color: #fff;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding-top: 2rem;\n  padding-bottom: 2rem;\n}\n\n.footer-nav ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n\n.footer-nav li {\n  display: inline-block;\n  margin-right: 1rem;\n}\n\n.footer-nav a {\n  color: #fff;\n  text-decoration: none;\n}\n\n.footer-social {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-bottom: 1rem;\n}\n\n.footer-social img {\n  width: 30px;\n  margin-right: 1rem;\n}\n\n.footer-info {\n  font-size: 1.2rem;\n}\n---endcss---\n\n---startjs---\n// Code goes here\n---endjs---',
        },
        finish_reason: "stop",
        index: 0,
      },
    ],
  };

  res.status(200).json(resp2);
});

// Start the server
const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`index.js listening on http://localhost:${port}`);
// });

// doesn't work for cyclic serverless
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
