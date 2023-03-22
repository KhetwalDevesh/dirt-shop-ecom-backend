import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "User",
		},
		name: {
			type: String,
			required: true,
		},
		image: [
			{
				type: String,
				required: true,
			},
		],
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		countInStock: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);
export default Product;
