import { createProduct, getAllProducts } from "../models/productStore.js";

export const fetchProducts = (_req, res) => {
  res.status(200).json(getAllProducts());
};

export const addProduct = (req, res) => {
  const { name, description, price, image } = req.body;
  const createdProduct = createProduct({
    name,
    description,
    price: Number(price),
    image
  });

  res.status(201).json(createdProduct);
};
