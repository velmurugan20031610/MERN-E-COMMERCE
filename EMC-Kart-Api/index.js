const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./config/firebase.config");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url)
  .then(() => console.log("Database connected"))
  .catch(err => {
    console.log("DB error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to EMCKart API" });
});

require("./routes/user.routes")(app);
require("./routes/product.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
