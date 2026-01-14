const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./config/firebase.config");

const app = express();

/**
 * ✅ CORS CONFIG (VERY IMPORTANT)
 */
app.use(cors({
  origin: [
    "http://localhost:5173", // local Vite
    "http://localhost:3000",
    "https://mern-e-commerce-kn9rfd3of-velmurugans-projects-e7562622.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Needed for preflight requests
app.options("*", cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Database
 */
const db = require("./models");
db.mongoose
  .connect(db.url)
  .then(() => console.log("Database connected"))
  .catch(err => {
    console.log("DB error", err);
    process.exit();
  });

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EMCKart API" });
});

require("./routes/user.routes")(app);
require("./routes/product.routes")(app);

/**
 * Server
 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
