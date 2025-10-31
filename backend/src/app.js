import express from "express";
import courseRoutes from "./routes/courseRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import { PrismaClient } from '@prisma/client';  
import cors from "cors"
import dotenv from "dotenv" 
dotenv.config(); 


const app = express(); 
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
const prisma=new PrismaClient()
app.use("/courses", courseRoutes);
app.use("/videos", videoRoutes);

app.listen(8080, () => console.log("Server running on port 8080"));
