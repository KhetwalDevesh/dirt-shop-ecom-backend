import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
	{
		orderItems: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
			},
		],
		contactInfo: {
			firstName: {
				type: String,
				required: true,
			},
			lastName: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
			phone: {
				type: Number,
				required: true,
			},
		},
		deliveryAddress: {
			address: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
			},
			pincode: {
				type: String,
				required: true,
			},
			country: {
				type: String,
				required: true,
			},
		},
		orderStatus: {
			type: String,
			required: true,
		},
		orderAmount: {
			type: Number,
			required: true,
		},
		paymentIntentId: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
