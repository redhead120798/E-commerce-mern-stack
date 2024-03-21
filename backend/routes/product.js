const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const product = await new Product(req.body);
    await product.save();
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json("Product not found !");
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json("Product not found !");
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json("Product not found !");
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json("Deleted successfully !");
  } catch (error) {
    res.status(500).json(error);
  }
});


// Search

router.get("/search/:productName",async (req, res) => {

  try {
    const productName  = req.params.productName ;
     const products = await Product.find({
      title:{$regex:productName,$options:"i"}
     })
    res.status(200).json(products)
  } catch (error) {
    res.status(200).json({error: "Server error"})
  }


});

module.exports = router;
