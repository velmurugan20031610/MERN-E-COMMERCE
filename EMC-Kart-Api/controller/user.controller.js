const db = require("../models");
const User = db.user;

/* =========================
   REGISTER USER
========================= */
exports.registerUser = async (req, res) => {
  try {
    const { uid, email, name } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const newUser = new User({
      uid,
      email,
      name,
      isAdmin: false,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   LOGIN / VALIDATE USER
========================= */
exports.validateUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
