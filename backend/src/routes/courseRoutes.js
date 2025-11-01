import express from "express";
import { getCoures, updateCourseProgress } from "../controller/coursecontroller.js";

const router = express.Router();

router.get("/", getCoures);
router.patch("/:courseId/:moduleId/progress", updateCourseProgress);

export default router;
