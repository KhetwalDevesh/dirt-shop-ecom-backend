import express, { Express } from "express";
import {
	createOrder,
	getOrders,
	deleteAllOrders,
} from "../controllers/orderController";

const orderRouter = express.Router();
orderRouter.route("/").get(getOrders).post(createOrder).delete(deleteAllOrders);

export default orderRouter;
