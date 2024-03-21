const express = require("express");
const router = express.Router();

// all routes

const productRoute = require("./product.js");
const categoryRoute = require("./category.js");
const couponRoute = require("./coupon.js");

const authRoute = require("./auth.js");
const userRoute = require("./users.js");

const paymentRoute = require("./payments.js");

router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/coupons", couponRoute);

router.use("/auth", authRoute);
router.use("/users", userRoute);

router.use("/payment", paymentRoute);

module.exports = router;
