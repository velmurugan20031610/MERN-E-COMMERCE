require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/* =========================
   🔥 CORS – FINAL WORKING
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://mern-e-commerce-kn9rfd3of-velmurugans-projects-e7562622.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 🔥 VERY IMPORTANT FOR RENDER (preflight)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

/* =========================
   BODY PARSER
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   FIREBASE INIT
========================= */
require("./config/firebase.config");

/* =========================
   DATABASE
========================= */
const db = require("./models");
db.mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });

/* =========================
   ROUTES
========================= */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to EMCKart API" });
});

require("./routes/user.routes")(app);
require("./routes/product.routes")(app);

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
