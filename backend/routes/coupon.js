const express = require("express");
const Coupon = require("../models/coupon");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { code } = req.body;
    
    const existCoupon = await Coupon.findOne({ code });
    
    if (existCoupon) {
      return res.status(400).json({ error: "This coupon is already exists !" });
    }
    
    const data = req.body;
    const coupon = new Coupon(data);
    await coupon.save();
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(200).json("Coupon not found");
    }

    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(200).json("Coupon not found");
    }
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// read single by coupon code

router.get("/code/:code", async (req, res) => {
  try {
    const code = req.params.code;
    const coupon = await Coupon.findOne({ code: code });

    if (!coupon) {
      return res.status(404).json("Coupon not found");
    }
    const { discounPercent } = coupon;
    res.status(200).json({ discounPercent });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      res.status(403).json("Coupon not found");
    }
    await Coupon.findByIdAndDelete(id);
    res.status(200).json("Deleted succesfully");
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
