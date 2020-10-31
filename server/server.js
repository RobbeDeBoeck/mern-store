if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/auth", require("./routes/auth"));

// production route
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root: "../client/build" });
  });
}

// start server
app.listen(PORT, () => console.log(`App started on port ${PORT}`));
