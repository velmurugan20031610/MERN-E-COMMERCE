require("dotenv").config();
const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;

// ONLY MongoDB models here
db.user = require("./user.model")(mongoose);
db.product = require("./product.model")(mongoose);

module.exports = db;
