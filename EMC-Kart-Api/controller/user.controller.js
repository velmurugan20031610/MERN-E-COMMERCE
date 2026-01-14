const db = require("../models");
const User = db.user;

/* =========================
   REGISTER USER
========================= */
exports.registerUser = async (req, res) => {
  try {
    const decoded = req.user;

    const email = decoded.email;
    const uid = decoded.uid;

    if (!email || !uid) {
      return res.status(400).json({ message: "Invalid token data" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        uid,
        email,
        name: email.split("@")[0],
        isAdmin: false,
      });
      await user.save();
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Register failed" });
  }
};

/* =========================
   VALIDATE USER (LOGIN)
========================= */
exports.validateUser = async (req, res) => {
  try {
    const decoded = req.user;

    const email = decoded.email;
    const uid = decoded.uid;

    if (!email || !uid) {
      return res.status(400).json({ message: "Invalid token data" });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        uid,
        email,
        name: email.split("@")[0],
        isAdmin: false,
      });
      await user.save();
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("VALIDATE ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
