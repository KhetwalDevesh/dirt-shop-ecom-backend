import Product from "../models/productModel";

export const createProduct = async (req, res) => {
	try {
		const product = await Product.create(req.body);
		res.json({ success: true, msg: product });
	} catch (error) {
		console.log("error in creating the product", error);
		throw error;
	}
};

export const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find();
		res.send(products);
	} catch (error) {
		console.log("error in getting all the products", error);
		throw error;
	}
};

export const getProductById = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			res.send(product);
		} else {
			res.status(404).send("Product not found");
		}
	} catch (error) {
		console.log("error in getting all the products", error);
		throw error;
	}
};

export const deleteAllProducts = async (req, res) => {
	try {
		const products = await Product.deleteMany({});
		res.send("All products removed successfully");
	} catch (error) {
		console.log("error in removing all the products");
	}
};

export const deleteProductById = async (req, res) => {
	try {
		await Product.deleteOne({ _id: req.params.id });
		res.send(`Product with id ${req.params.id} deleted successfully`);
	} catch (error) {
		console.log("error in deleted product by id");
	}
};
