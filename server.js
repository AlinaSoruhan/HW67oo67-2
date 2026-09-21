const express = require("express");

const app = express();
const PORT = 6766;

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 1200,
        category: "electronics"
    },
    {
        id: 2,
        name: "Phone",
        price: 800,
        category: "electronics"
    },
    {
        id: 3,
        name: "Desk",
        price: 300,
        category: "furniture"
    },
    {
        id: 4,
        name: "Chair",
        price: 150,
        category: "furniture"
    },
    {
        id: 5,
        name: "Headphones",
        price: 100,
        category: "electronics"
    }
];

app.get("/products", (req, res) => {
    let result = [...products];

    const { take, category } = req.query;

    if (category) {
        result = result.filter(product => product.category === category);
    }

    if (take !== undefined) {
        const takeNumber = Number(take);

        if (!Number.isNaN(takeNumber) && takeNumber >= 0) {
            result = result.slice(0, takeNumber);
        }
    }

    res.status(200).json(result);
});

app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Invalid product id"
        });
    }

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});