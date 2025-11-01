import express from "express";
import { markVideoComplete } from "../controller/vidoecontroller.js";

const router = express.Router();

router.patch("/:moduleID/:videoId/complete", markVideoComplete);

export default router;
