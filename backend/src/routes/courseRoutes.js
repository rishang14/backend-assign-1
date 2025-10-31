import express from "express";
import { getCoures, updateCourseProgress } from "../controller/coursecontroller.js";

const router = express.Router();

router.get("/", getCoures);
router.patch("/progress", updateCourseProgress);

export default router;
