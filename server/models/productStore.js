let nextId = 5;

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    description: "Ergonomic design with silent clicks",
    price: 799,
    image: "https://via.placeholder.com/260x160?text=Wireless+Mouse"
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description: "Blue switches with RGB backlighting",
    price: 2499,
    image: "https://via.placeholder.com/260x160?text=Mechanical+Keyboard"
  },
  {
    id: 3,
    name: "USB-C Hub",
    description: "7-in-1 high-speed multiport adapter",
    price: 1499,
    image: "https://via.placeholder.com/260x160?text=USB-C+Hub"
  },
  {
    id: 4,
    name: "Noise Cancelling Headphones",
    description: "Over-ear headphones with deep bass",
    price: 3999,
    image: "https://via.placeholder.com/260x160?text=Headphones"
  }
];

export const getAllProducts = () => products;

export const createProduct = ({ name, description, price, image }) => {
  const createdProduct = {
    id: nextId,
    name,
    description,
    price,
    image
  };

  nextId += 1;
  products.push(createdProduct);

  return createdProduct;
};
