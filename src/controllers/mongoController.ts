// const Post = require("../mongo/post");

import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import dotenv from "dotenv";
import { getDatabase } from "../mongo/mongo.config";
import { ObjectId } from "mongodb";

export default class MongoController {
  static async retry(fn: any, maxRetries: any, delayMs: any) {
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
  }

  static async createPostWithRetry(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { prompt, html, css, js, author } = req.body;

      const newPost = await getDatabase().collection("posts").insertOne({
        prompt,
        html,
        css,
        js,
        author,
      });

      res.send(newPost);
    } catch (e) {}
  }

  static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      // const newPost = await retry(() => this.createPostWithRetry(req), 3, 1000);
      // res.status(200).json({ success: true, data: newPost });
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
  /*
  static async createPost = async (req, res) => {
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

  static async updatePost(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { prompt, html, css, js } = req.body;
    try {
      const post = await getDatabase()
        .collection("posts")
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

  static async getPostsByAuthor(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { author } = req.params;

      const generations = await getDatabase()
        .collection("posts")
        .find({ author: author })
        .sort({ date: -1 })
        .toArray();

      const generationsV2 = await getDatabase()
        .collection("postV2")
        .find({ author: author })
        .sort({ date: -1 })
        .toArray();

      res
        .status(200)
        .json({ success: true, data: [generations, generationsV2] });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to fetch your posts, please try again",
      });
    }
  }

  static async getGenerations(req: Request, res: Response, next: NextFunction) {
    try {
      const generations = await getDatabase()
        .collection("posts")
        .find({})
        .sort({ date: -1 })
        .toArray();

      res.status(200).json({ success: true, data: generations });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to get generations, please try again",
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

      const total = await getDatabase().collection("posts").countDocuments({});
      const posts = await getDatabase()
        .collection("posts")
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

  static async getPostById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const posts = await getDatabase()
        .collection("posts")
        .findOne({ _id: new ObjectId(id) });

      res.status(200).json({ success: true, data: posts });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to get posts, please try again",
      });
    }
  }
}
