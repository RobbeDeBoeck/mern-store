const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");

const router = express.Router();

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const query = req.query.q || "";
  const cat = req.query.cat;

  const options = { name: { $regex: `.*${query}.*` } };
  if (mongoose.Types.ObjectId.isValid(cat)) options.category = cat;

  const start = (page - 1) * limit;
  const end = page * limit;
  const total = await Product.countDocuments(options).exec();
  const pages = Math.ceil(total / limit);

  const result = { total, pages };

  if (start > 0) result.previous = page - 1;
  if (end < total) result.next = page + 1;

  try {
    result.data = await Product.find(options).limit(limit).skip(start).exec();
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(404).json({ message: "Product not found" });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
