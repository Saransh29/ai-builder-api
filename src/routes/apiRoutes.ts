import { Router } from "express";
import ApiController from "../controllers/ApiController";

const { createChatCompletion, build, testingApi } = ApiController;

const router = Router();

router.post("/GPT", createChatCompletion);
router.post("/build", build);
router.post("/testing-api", testingApi);

export default router;
