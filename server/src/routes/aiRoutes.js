import express from "express";

import { explainQuestion } from "../controllers/aiController.js";
import { validateExplainRequest } from "../middleware/validateRequest.js";

const router = express.Router();

router.post(
  "/explain",
  validateExplainRequest,
  explainQuestion
);

export default router;