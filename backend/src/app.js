import express from "express";
// import courseRoutes from "./routes/courseRoutes.js";
// import videoRoutes from "./routes/videoRoutes.js";
import { PrismaClient } from '@prisma/client'; 
import dotenv from "dotenv" 
dotenv.config(); 


const app = express();
app.use(express.json());
const prisma=new PrismaClient()
// app.use("/courses", courseRoutes);
// app.use("/videos", videoRoutes);

app.listen(8080, () => console.log("Server running on port 8080"));
