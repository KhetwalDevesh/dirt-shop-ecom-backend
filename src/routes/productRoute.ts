import express, { Express } from "express";
import {
	createProduct,
	deleteAllProducts,
	deleteProductById,
	getAllProducts,
	getProductById,
} from "../controllers/productController";
const productRouter = express.Router();

productRouter
	.route("/")
	.get(getAllProducts)
	.post(createProduct)
	.delete(deleteAllProducts);
productRouter.route("/:id").get(getProductById).delete(deleteProductById);

export default productRouter;
