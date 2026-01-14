require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://mern-e-commerce-kn9rfd3of-velmurugans-projects-e7562622.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 Firebase Admin (LOAD ONCE)
require("./config/firebase.config");

// 🔥 MongoDB
const db = require("./models");

db.mongoose
  .connect(db.url)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => {
    console.error("❌ DB error", err);
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
  console.log(`🚀 Server running on port ${PORT}`);
});
