import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Invalid email." });

    const matches = await bcrypt.compare(req.body.password, user.password);
    if (!matches) return res.status(400).json({ message: "Email and password do not match." });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/register", async (req, res) => {
  const exists = await User.exists({ email: req.body.email });
  if (exists) return res.status(400).json({ message: "Email already in use." });

  const password = req.body.password;
  if (!password) return res.status(400).json({ message: "Password is required." });

  const hash = await bcrypt.hash(password, 10);
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
  });

  try {
    await newUser.save();
    res.status(201).json({ _id: newUser._id });
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
