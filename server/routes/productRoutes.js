import express from "express";
import { addProduct, fetchProducts } from "../controllers/productController.js";
import { validateProduct } from "../middlewares/validateProduct.js";

const router = express.Router();

router.get("/", fetchProducts);
router.post("/", validateProduct, addProduct);

export default router;
