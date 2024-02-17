import { Router } from "express";
import MongoController from "../controllers/mongoController";

const {
  createPost,
  updatePost,
  getPostsByAuthor,
  getGenerations,
  getPaginatedGenerations,
  getPostById,
} = MongoController;

const router = Router();

router.post("/mongo", createPost);
router.put("/mongo/:id", updatePost);
router.get("/mongo/:author", getPostsByAuthor);
router.get("/generations", getGenerations);
router.get("/pagination", getPaginatedGenerations);
router.get("/post/:id", getPostById);

export default router;
