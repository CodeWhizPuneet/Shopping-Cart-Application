export const validateProduct = (req, res, next) => {
  const { name, description, price, image } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ message: "Product name is required." });
  }

  if (!description || typeof description !== "string") {
    return res.status(400).json({ message: "Product description is required." });
  }

  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return res.status(400).json({ message: "Price must be a valid positive number." });
  }

  if (!image || typeof image !== "string") {
    return res.status(400).json({ message: "Product image URL is required." });
  }

  return next();
};
