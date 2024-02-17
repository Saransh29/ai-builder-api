import { Router } from "express";
import apiRoutes from "./apiRoutes";
import mongoRoutes from "./mongoRoutes";
import testRoutes from "./testRoutes";

const router = Router();

router.use("/", apiRoutes);
router.use("/", mongoRoutes);
router.use("/", testRoutes);

router.get("/health", (req, res) => {
  res.send("HELLO FROM AI BUILDER!");
});

export default router;
