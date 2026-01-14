module.exports = (app) => {
  const products = require("../controller/product.controller");
  const verifyToken = require("../utility/commonFunctions");

  const router = require("express").Router();

  // PUBLIC – FETCH PRODUCTS
  router.get("/", products.fetchAll);

  // ADMIN ONLY
  router.post("/create", verifyToken, products.create);
  router.post("/checkoutProducts", verifyToken, products.checkoutProducts);
  router.post("/verifyCheckout", verifyToken, products.verifyCheckout);

  app.use("/api/product", router);
};
