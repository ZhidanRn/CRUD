import express from "express"
import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from "../controllers/ProductController.js";

const router = express.Router();
router.get("/products", getProduct);
router.get("/products/:id", getProductById);
router.post("/products", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router