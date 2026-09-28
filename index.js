const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let products = [
  { id: 1, name: "burger", price: 50 },
  { id: 2, name: "fries", price: 30 },
];

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the api" });
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const foundProduct = products.find((p) => p.id === productId);

  if (!foundProduct) {
    return res.status(404).json({ message: "product not found" });
  }
  res.status(200).json(foundProduct);
});

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: "name and price are required" });
  }
  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
