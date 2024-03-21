const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const router = express.Router();

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 70 + 1);
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json("Melumatlari daxil edin");
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json("Email istifade olunub");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({
      username,
      email,
      password: hashedPassword,
      avatar: generateRandomAvatar(),
    }).save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  } 
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Melumatlari daxil edin");
    }
    const existing = await User.findOne({ email });
    if (!existing) {
      return res.status(404).json("User not found !");
    }
    const user = await User.findOne({
      email,
    });
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(400).json("Wrong password !");
    }
    res.status(200).json({
      id:user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
