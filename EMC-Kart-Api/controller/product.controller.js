const db = require("../models");
const Product = db.product;
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.fetchAll = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

exports.create = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.send({ message: "Product added" });
};

exports.checkoutProducts = async (req, res) => {
  const { amount } = req.body;

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
  });

  res.send({ data: order });
};

exports.verifyCheckout = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expected === razorpay_signature) {
    res.send({ success: true });
  } else {
    res.status(400).send({ success: false });
  }
};
exports.create = async (req, res) => {
  if (!req.user || !req.user.email) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const user = await db.user.findOne({ email: req.user.email });

  if (!user || !user.isAdmin) {
    return res.status(403).send({ message: "Admin only" });
  }

  const product = new Product(req.body);
  await product.save();
  res.send({ message: "Product created" });
};
