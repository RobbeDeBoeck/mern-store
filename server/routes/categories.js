const express = require("express");
const Category = require("../models/category");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
