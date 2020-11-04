import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import productRoutes from "./routes/products";
import categoryRoutes from "./routes/categories";
import authRoutes from "./routes/auth";

const app = express();
const { DB_USER, DB_PASWD, DB_NAME, PORT = 4000 } = process.env;

// Database setup
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASWD}@cluster0.ryzjc.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", err => console.error(err));
db.once("open", () => console.log("Connected to database"));

// middleware
app.use(express.json());
app.use(cors());

// api routes
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);

// production route
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: "../client/build" });
  });
}

// start server
app.listen(PORT, () => console.log(`App started on port ${PORT}`));
