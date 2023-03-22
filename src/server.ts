import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db";
import colors from "colors";
import productRouter from "./routes/productRoute";
// const colors = require("colors");
const app = express();
dotenv.config();
const PORT = process.env.PORT;
connectToDatabase();
app.use(cors());
app.use(express.json());
app.get("/ping", (request: Request, response: Response) => {
	response.send("Pong");
});

app.use("/products", productRouter);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
