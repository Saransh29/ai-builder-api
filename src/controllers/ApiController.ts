import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { get } from "lodash";
import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import { TogetherAIModels } from "../constants";

const openai = new OpenAI({
  baseURL: "https://api.together.xyz/v1",
  apiKey: process.env.TOGETHER_API_KEY,
});

export default class ApiController {
  static async createChatCompletion(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const command = get(req.body, "command", "");

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are a world class developer Write code. with full functionality, descriptive sections,good animations, good design,vibrant colors, for the images add https://ai-builder-api-production.up.railway.app/api/v1/searchImages?q=?{prompt here} to the src.i am using gsap 3.11.5 for animations write code in body for animations. i am using bootstrap 5.2.3 for css. just write the body of the html. don't worry about the head. ",
          },
          {
            role: "user",
            content: command,
          },
        ],
      });
      const airesponse = chatCompletion?.choices?.[0]?.message?.content?.trim();
      res.status(200).json(airesponse);
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  }

  static async build(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const mode = get(req.body, "mode", "");
    const command = get(req.body, "command", "");

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a world class developer Write code. with full functionality, descriptive sections,good animations, good design,vibrant colors, for the images add https://ai-builder-api-production.up.railway.app/api/v1/searchImages?q=?{prompt here} to the src.i am using gsap 3.11.5 for animations write code in body for animations. i am using bootstrap 5.2.3 for css. just write the body of the html. don't worry about the head. ",
        },
        {
          role: "user",
          content: command,
        },
      ],
    };
    try {
      const resp = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        apiRequestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY2}`,
          },
        },
      );
      // console.log(resp.data);

      res.status(200).json(resp.data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  }

  static async testingApi(req: Request, res: Response, next: NextFunction) {
    const command = get(req.body, "command", "");

    try {
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
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  }
}
