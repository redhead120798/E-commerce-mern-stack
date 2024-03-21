const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      
      if (!user) {
        res.status(403).json("User not found");
      }
      await User.findByIdAndDelete(id)
      res.status(200).json("Deleted succesfully");
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router