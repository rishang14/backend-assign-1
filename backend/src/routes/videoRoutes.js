import express from "express";
import { markVideoComplete } from "../controllers/videoController.js";

const router = express.Router();

router.patch("/:videoId/complete", markVideoComplete);

export default router;
