const db = require("../models");
const Product = db.product;
const User = db.user;

/* =========================
   FETCH ALL PRODUCTS (PUBLIC)
========================= */
exports.fetchAll = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   CREATE PRODUCT (ADMIN ONLY)
========================= */
exports.create = async (req, res) => {
  try {
    // 🔐 Firebase decoded token
    const { email } = req.user;

    if (!email) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // ✅ CHECK ADMIN BY EMAIL (CORRECT WAY)
    const adminUser = await User.findOne({ email });

    if (!adminUser || adminUser.isAdmin !== true) {
      return res.status(403).json({ message: "Admin access required" });
    }

    // ✅ Create product
    const product = new Product({
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      imageURL: req.body.imageURL,
      description: req.body.description,
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   CHECKOUT PRODUCTS
========================= */
exports.checkoutProducts = async (req, res) => {
  try {
    res.status(200).json({ message: "Checkout initiated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   VERIFY CHECKOUT
========================= */
exports.verifyCheckout = async (req, res) => {
  try {
    res.status(200).json({ message: "Checkout verified" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
