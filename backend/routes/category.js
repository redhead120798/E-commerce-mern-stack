const express = require("express");
const Category = require("../models/category");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, img } = req.body;
    const newCategory = await new Category({ name, img });
    await newCategory.save();
    res.status(200).json("Category created success !");
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(category);
    if (!category) {
      res.status(403).json("Category not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    
    if (!category) {
      res.status(403).json("Category not found");
    }
    await Category.findByIdAndDelete(id)
    res.status(200).json("Deleted succesfully");
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
