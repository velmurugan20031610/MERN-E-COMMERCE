module.exports = (app) => {
  const users = require("../controller/user.controller");
  const verifyToken = require("../utility/commonFunctions");

  const router = require("express").Router();

  // SIGNUP
  router.post("/register", verifyToken, users.registerUser);

  // LOGIN
  router.post("/validate", verifyToken, users.validateUser);

  app.use("/api/user", router);
};
