const express = require('express');
const app = express();
const PORT = 6767;

app.use(express.json());

let products = [
  { id: 1, 
    name: "Laptop",
    price: 1000, 
    category: "Electronics", 
    image: "",
  },
  { id: 2, 
    name: "Keyboard", 
    price: 50, 
    category: "Electronics", 
    image: "",
  }
];

const addProduct = (newProduct, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        return reject(new Error("error"));
      }

      const isDuplicate = products.some(
        (product) => product.name.toLowerCase() === newProduct.name.toLowerCase()
      );

      if (isDuplicate) {
        const error = new Error("Product already exists");
        error.code = "DUPLICATE"; 
        return reject(error);
      }

      const productToSave = {
        id: Date.now(),
        name: newProduct.name,
        price: Number(newProduct.price),
        category: newProduct.category,
        image: newProduct.image || ""
      };

      products.push(productToSave);
      resolve(productToSave);
    }, 100);
  });
};

app.post('/products', async (req, res) => {
  const { name, price, category, image } = req.body;
  const shouldFail = req.query.fail === 'true';

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(422).send("Invalid product data");
  }

  if (price === undefined || typeof price !== 'number' || price <= 0) {
    return res.status(422).send("Invalid product data");
  }

  if (!category || typeof category !== 'string' || category.trim() === '') {
    return res.status(422).send("Invalid product data");
  }

  try {
    const savedProduct = await addProduct({ name, price, category, image }, shouldFail);
    return res.status(201).json(savedProduct);
  } catch (error) {
    if (error.code === 'DUPLICATE') {
      return res.status(409).send("Conflict");
    }
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
