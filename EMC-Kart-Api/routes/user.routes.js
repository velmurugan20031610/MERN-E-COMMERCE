module.exports = (app) => {
  const users = require("../controller/user.controller");
  const verifyToken = require("../utility/commonFunctions");

  const router = require("express").Router();

  // ✅ REGISTER (needs token)
  router.post("/register", verifyToken, users.registerUser);

  // ✅ LOGIN / VALIDATE (needs token)
  router.post("/validate", verifyToken, users.validateUser);

  app.use("/api/user", router);
};
