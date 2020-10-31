require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/product");
const Category = require("../models/category");
const { DB_USER, DB_PASWD, DB_NAME } = process.env;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASWD}@cluster0.ryzjc.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", err => console.error(err));

db.once("open", async () => {
  console.log("Connected to database");
  await Product.deleteMany({});
  await Category.deleteMany({});

  console.log("Seeding categories...");
  await Promise.all([
    Category.create({
      name: "Category 1",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
      image: "https://via.placeholder.com/1280x320",
    }),
    Category.create({
      name: "Category 2",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
      image: "https://via.placeholder.com/1280x320",
    }),
    Category.create({
      name: "Category 3",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
      image: "https://via.placeholder.com/1280x320",
    }),
  ]).then(() => console.log("Seeded categories"));

  const categories = await Category.find();

  console.log("Seeding products...");
  Promise.all([
    Product.create({
      name: "Product 1",
      price: 15,
      image: "https://via.placeholder.com/400x300",
      category: categories[0]._id,
    }),
    Product.create({
      name: "Product 2",
      price: 30,
      image: "https://via.placeholder.com/400x300",
      category: categories[0]._id,
    }),
    Product.create({
      name: "Product 3",
      price: 45,
      image: "https://via.placeholder.com/400x300",
      category: categories[0]._id,
    }),
    Product.create({
      name: "Product 4",
      price: 60,
      image: "https://via.placeholder.com/400x300",
      category: categories[0]._id,
    }),
    Product.create({
      name: "Product 5",
      price: 75,
      image: "https://via.placeholder.com/400x300",
      category: categories[0]._id,
    }),
    Product.create({
      name: "Product 6",
      price: 15,
      image: "https://via.placeholder.com/400x300",
      category: categories[1]._id,
    }),
    Product.create({
      name: "Product 7",
      price: 30,
      image: "https://via.placeholder.com/400x300",
      category: categories[1]._id,
    }),
    Product.create({
      name: "Product 8",
      price: 45,
      image: "https://via.placeholder.com/400x300",
      category: categories[1]._id,
    }),
    Product.create({
      name: "Product 9",
      price: 60,
      image: "https://via.placeholder.com/400x300",
      category: categories[1]._id,
    }),
    Product.create({
      name: "Product 10",
      price: 15,
      image: "https://via.placeholder.com/400x300",
      category: categories[2]._id,
    }),
    Product.create({
      name: "Product 11",
      price: 30,
      image: "https://via.placeholder.com/400x300",
      category: categories[2]._id,
    }),
    Product.create({
      name: "Product 12",
      price: 45,
      image: "https://via.placeholder.com/400x300",
      category: categories[2]._id,
    }),
    Product.create({
      name: "Product 13",
      price: 60,
      image: "https://via.placeholder.com/400x300",
      category: categories[2]._id,
    }),
  ]).then(() => console.log("Seeded products"));
});
