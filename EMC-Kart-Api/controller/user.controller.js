const db = require("../models");
const User = db.user;

/* =========================
   REGISTER USER
========================= */
exports.registerUser = async (req, res) => {
  try {
    console.log("🟡 REGISTER req.user:", req.user);

    const { uid, email } = req.user;

    if (!uid || !email) {
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
    console.error("🔥 REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   VALIDATE USER (LOGIN)
========================= */
exports.validateUser = async (req, res) => {
  try {
    console.log("🟡 VALIDATE req.user:", req.user);

    const { uid, email } = req.user;

    if (!uid || !email) {
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
    console.error("🔥 VALIDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
