import express from "express";
import { getCourseById, updateCourseProgress } from "../controller/coursecontroller.js";

const router = express.Router();

router.get("/", getCourseById);
router.patch("/:id/progress", updateCourseProgress);

export default router;
