import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import { get } from "lodash";
import dotenv from "dotenv";
import { getDatabase } from "../mongo/mongo.config";
import { ObjectId } from "mongodb";
dotenv.config();
import OpenAI from "openai";
import { TogetherAIModels } from "../constants";

const openai = new OpenAI({
  baseURL: "https://api.together.xyz/v1",
  apiKey: process.env.TOGETHER_API_KEY,
});

export default class ApiV2Controller {
  static async betaCompletion(req: Request, res: Response, next: NextFunction) {
    try {
      const command = get(req.body, "command", "");

      const chatCompletion = await openai.chat.completions.create({
        model: TogetherAIModels.NousHermes2Mixtral8x7BDPO,
        messages: [
          {
            role: "system",
            content:
              `You are a world class developer Write code. with full functionality, 
              descriptive sections,good animations, good design,vibrant colors, 
              for the images add https://source.unsplash.com/featured/?{prompt here} 
              to the src.i am using gsap 3.11.5 for animations write code in body for animations. 
              i am using bootstrap 5.2.3 for css. just write the body of the html. don't worry about the head.`,
          },
          {
            role: "user",
            content: command,
          },
        ],
        stream: true,
      });

      let html = "";
      for await (const chunk of chatCompletion) {
        if (chunk?.choices[0]?.delta?.content === undefined) {
          break;
        }
        html += chunk?.choices[0]?.delta?.content || "";
      }

      res.status(200).json({html});
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  }

  static async dummyCompletion(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const command = get(req.body, "command", "");

      const v2 = {
        id: "chatcmpl-75a2MGjyspyzo4wnZ6Msg1PgDYxlq",
        object: "chat.completion",
        created: 1681564522,
        model: "gpt-3.5-turbo-0301",
        usage: {
          prompt_tokens: 91,
          completion_tokens: 1270,
          total_tokens: 1361,
        },
        choices: [
          {
            message: {
              role: "assistant",
              content:
                '<body>\n  <!-- Navbar -->\n  <nav class="navbar navbar-expand-lg navbar-light bg-light">\n    <div class="container-fluid">\n      <a class="navbar-brand" href="#">My Car Showroom</a>\n      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"\n        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\n        <span class="navbar-toggler-icon"></span>\n      </button>\n      <div class="collapse navbar-collapse" id="navbarNav">\n        <ul class="navbar-nav ms-auto">\n          <li class="nav-item">\n            <a class="nav-link active" href="#">Home</a>\n          </li>\n          <li class="nav-item">\n            <a class="nav-link" href="#">Features</a>\n          </li>\n          <li class="nav-item">\n            <a class="nav-link" href="#">Pricing</a>\n          </li>\n          <li class="nav-item">\n            <a class="nav-link" href="#">Contact Us</a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n\n  <!-- Main Content -->\n  <div class="container-fluid">\n    <div class="row">\n      <div class="col-lg-6 col-md-6 col-sm-12 my-auto">\n        <h1>Explore Our Collection</h1>\n        <p>Find the car that\'s perfect for you.</p>\n        <a href="#" class="btn btn-primary btn-lg">View Collection</a>\n      </div>\n      <div class="col-lg-6 col-md-6 col-sm-12">\n        <img src="https://source.unsplash.com/featured/?cars" class="img-fluid" alt="Car Showroom">\n      </div>\n    </div>\n\n    <div class="row mt-5">\n      <div class="col-lg-4 col-md-4 col-sm-12">\n        <img src="https://source.unsplash.com/featured/?coupe" class="img-fluid" alt="Coupe Car">\n        <h3>Coupes</h3>\n        <p>Explore our collection of coupes and find the one that fits your lifestyle.</p>\n      </div>\n      <div class="col-lg-4 col-md-4 col-sm-12">\n        <img src="https://source.unsplash.com/featured/?sedan" class="img-fluid" alt="Sedan Car">\n        <h3>Sedans</h3>\n        <p>Find your perfect sedan from our vast selection of vehicles.</p>\n      </div>\n      <div class="col-lg-4 col-md-4 col-sm-12">\n        <img src="https://source.unsplash.com/featured/?sportscar" class="img-fluid" alt="Sports Car">\n        <h3>Sports Cars</h3>\n        <p>Experience thrill and adrenaline with our collection of sports cars.</p>\n      </div>\n    </div>\n  </div>\n\n  <!-- Footer -->\n  <footer class="bg-light text-center text-lg-start">\n    <div class="container p-4">\n      <div class="row">\n        <div class="col-lg-6 col-md-12 mb-4 mb-md-0">\n          <h5 class="text-uppercase">My Car Showroom</h5>\n          <p>\n            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat\n            pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque\n            cumque eum delectus sint!\n          </p>\n        </div>\n        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">\n          <h5 class="text-uppercase">Links</h5>\n          <ul class="list-unstyled mb-0">\n            <li>\n              <a href="#!" class="text-dark">Home</a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark">Features</a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark">Pricing</a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark">Contact Us</a>\n            </li>\n          </ul>\n        </div>\n        <div class="col-lg-3 col-md-6 mb-4 mb-md-0">\n          <h5 class="text-uppercase mb-0">Follow Us</h5>\n          <ul class="list-unstyled">\n            <li>\n              <a href="#!" class="text-dark"><i class="fab fa-facebook"></i></a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark"><i class="fab fa-twitter"></i></a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark"><i class="fab fa-instagram"></i></a>\n            </li>\n            <li>\n              <a href="#!" class="text-dark"><i class="fab fa-youtube"></i></a>\n            </li>\n          </ul>\n        </div>\n      </div>\n    </div>\n\n    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">\n      &copy; 2022 My Car Showroom. All Rights Reserved.\n    </div>\n  </footer>\n\n  <!-- Bootstrap JS -->\n  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"\n    integrity="sha384-Wca9jKgW8Q/KxnV7q3+DmNHV7wsW8gjJd11LeHnnxX9RduKulBhKPDXtLzKFHThr"\n    crossorigin="anonymous">\n  </script>\n</body>',
            },
            finish_reason: "stop",
            index: 0,
          },
        ],
      };

      res.status(200).json({ data: v2 });
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  }

  static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { prompt, html, author } = req.body;

      const newPost = await getDatabase().collection("postv2").insertOne({
        prompt,
        html,
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
  }
  static async updatePost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { prompt, html, css, js } = req.body;
    try {
      const post = await getDatabase()
        .collection("postv2")
        .updateOne(
          { _id: new ObjectId(id) },
          {
            $set: {
              prompt,
              html,
              css,
              js,
            },
          },
        );

      res.status(200).json({ success: true, data: { prompt, html, css, js } });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to update a post, please try again",
      });
    }
  }

  static async getPostbyId(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const post = await getDatabase()
        .collection("postv2")
        .findOne({ _id: new ObjectId(id) });

      res.status(200).json({ success: true, data: post });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to fetch a post, please try again",
      });
    }
  }

  static async getPaginatedGenerations(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const PAGE_SIZE = 12;
      const page = parseInt(get(req.query, "page", "1").toString(), 10);

      const total = await getDatabase().collection("postv2").countDocuments({});
      const posts = await getDatabase()
        .collection("postv2")
        .find({})
        .sort({ date: -1 })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page)
        .toArray();
      res.json({
        total: total,
        totalPages: Math.ceil(total / PAGE_SIZE),
        data: posts,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to get generations, please try again",
      });
    }
  }

  static async getImages(req: Request, res: Response, next: NextFunction) {
    const query = req.query.q;
    if (!query) {
      return res
        .status(400)
        .send({ error: 'Query parameter "q" is required.' });
    }

    try {
      const response = await axios.get(
        "https://www.googleapis.com/customsearch/v1",
        {
          params: {
            key: process.env.GOOGLE_API_KEY,
            cx: process.env.GOOGLE_CSE_ID,
            q: query,
            searchType: "image",
            num: 1,
          },
        },
      );

      const items = response.data.items;
      if (items && items.length > 0) {
        const imageUrl = items[0].link;
        return res.redirect(imageUrl);
      } else {
        return res
          .status(404)
          .send({ error: "No images found for the given query." });
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      return res
        .status(500)
        .send({ error: "An error occurred while fetching images." });
    }
  }
}
