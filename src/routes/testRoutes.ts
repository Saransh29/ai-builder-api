import { Router } from "express";
const router = Router();

import ApiV2Controller from "../controllers/ApiV2Controller";

const {
  betaCompletion,
  createPost,
  updatePost,
  dummyCompletion,
  getPostbyId,
  getPaginatedGenerations,
  getImages,
} = ApiV2Controller;

router.post("/test", betaCompletion);
router.post("/dummy", dummyCompletion);

router.post("/create", createPost);
router.put("/update/:id", updatePost);
router.get("/postv2/:id", getPostbyId);
router.get("/betapagination", getPaginatedGenerations);
router.get("/searchImages", getImages);

export default router;