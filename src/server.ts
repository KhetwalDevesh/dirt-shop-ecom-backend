import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from "./db";
import colors from "colors";
import productRouter from "./routes/productRoute";
import orderRouter from "./routes/orderRoute";
import Stripe from "stripe";
import Order from "./models/orderModel";
// import Stripe from "stripe";
// const colors = require("colors");
dotenv.config();
const app = express();

const PORT = process.env.PORT;
connectToDatabase();
app.use(cors());
app.use(express.json());
app.get("/ping", (request: Request, response: Response) => {
	response.send("Pong");
});

// const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
console.log(
	"process.env.STRIPE_SECRET_KEY",
	JSON.stringify(process.env.STRIPE_SECRET_KEY, null, 2)
);
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
	apiVersion: "2022-11-15",
});
const endpointSecret =
	"whsec_7847e6bd056f1e0ef6521e4b161f91912a0caad833a13bf67c8c385aa17f5fab";
app.post(
	"/webhook",
	express.raw({ type: "*/*" }),
	async (request, response) => {
		try {
			const sig = request.headers["stripe-signature"];
			let event;
			try {
				event = stripe.webhooks.constructEvent(
					request.body,
					sig,
					endpointSecret
				);
			} catch (err) {
				response.status(400).send(`Webhook Error: ${err.message}`);
				return;
			}

			// Handle the event
			switch (event.type) {
				case "charge.succeeded":
					const chargeSucceeded = event.data.object;
					console.log("charge succeeded");
					await Order.updateOne(
						{
							paymentIntentId: chargeSucceeded.payment_intent,
						},
						{
							paymentDetails: chargeSucceeded,
							orderStatus: "succeeded",
						}
					);
					break;
				case "payment_intent.succeeded":
					const paymentIntentSucceeded = event.data.object;
					break;
				default:
					console.log(`Unhandled event type ${event.type}`);
			}
		} catch (error) {}
	}
);

app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
