const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { TOKEN_EXPIRATION } = require("../constants");
require("dotenv").config();

exports.generateToken = (req, res) => {
  const token = jwt.sign(
    { userId: "arbitrary_user_id" },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_EXPIRATION }
  );

  mongoose.connection.collection("tokens").insertOne({ token });

  res.json({ token });
};
