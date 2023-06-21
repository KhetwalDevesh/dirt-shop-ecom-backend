import dotenv from "dotenv";
dotenv.config();
import { Stripe } from "stripe";
import Order from "../models/orderModel";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
	apiVersion: "2022-11-15",
});
const calculateOrderAmount = (orderItems) => {
	const totalAmount = orderItems.reduce(
		(amount, item) => amount + item.price * item.quantity,
		0
	);
	return totalAmount;
};

export const createOrder = async (req, res) => {
	try {
		const { orderItems, contactInfo, deliveryAddress, orderStatus } = req.body;
		console.log("req.body", JSON.stringify(req.body, null, 2));
		const orderAmount = calculateOrderAmount(orderItems);
		console.log("orderAmount", JSON.stringify(orderAmount, null, 2));
		const paymentIntent = await stripe.paymentIntents.create({
			amount: orderAmount * 100,
			currency: "inr",
			// automatic_payment_methods: { enabled: true },
		});
		console.log("paymentIntent", JSON.stringify(paymentIntent, null, 2));
		const paymentIntentId = paymentIntent.id;
		const order = await Order.create({
			orderItems,
			contactInfo,
			deliveryAddress,
			orderStatus,
			orderAmount,
			paymentIntentId,
		});

		res.send({
			clientSecret: paymentIntent.client_secret,
			orderItems,
			contactInfo,
			deliveryAddress,
			orderAmount,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getOrders = async (req, res) => {
	try {
		const orders = await Order.find({});
		res.send(orders);
	} catch (error) {
		res.send("Something went wrong in getOrders");
	}
};

export const deleteAllOrders = async (req, res) => {
	try {
		await Order.deleteMany({});
		res.send("All orders deleted successfully");
	} catch (error) {}
};
