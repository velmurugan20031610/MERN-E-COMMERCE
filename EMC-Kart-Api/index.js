require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

/* ===== FINAL CORS FIX ===== */
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight requests
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Firebase Admin (load once)
require("./config/firebase.config");

// MongoDB
const db = require("./models");

db.mongoose
  .connect(db.url)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("DB error", err);
    process.exit(1);
  });

// Test route
app.get("/", (req, res) => {
  res.send("welcome");
});

// Routes
require("./routes/user.routes")(app);
require("./routes/product.routes")(app);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
