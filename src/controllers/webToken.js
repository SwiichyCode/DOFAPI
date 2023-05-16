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

exports.verifyToken = (req, res, next) => {
  const token = req.headers["x-acces-token"];

  if (!token) {
    return res.status(403).json({ message: "Aucun token fourni" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ message: "Token invalide" });
    }

    mongoose.connection
      .collection("tokens")
      .findOne({ token }, (error, data) => {
        if (error) {
          return res.status(500).json({ message: error });
        }

        if (!data) {
          return res.status(403).json({ message: "Token invalide" });
        }

        req.token = decodedToken;

        next();
      });
  });
};
