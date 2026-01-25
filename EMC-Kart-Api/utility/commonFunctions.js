const admin = require("../config/firebase.config");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    //  THIS IS THE KEY LINE — WITHOUT THIS SIGNUP FAILS
    req.user = decodedToken;

    next();
  } catch (err) {
    console.error("TOKEN VERIFY ERROR:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
