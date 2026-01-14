const admin = require("../config/firebase.config");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    // ✅ Attach decoded user
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("VERIFY TOKEN ERROR:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
