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

  mongoose.connection.collection("users").findOneAndUpdate(
    { id: req.body.userId },
    { $set: { token } },

    (error, data) => {
      if (error) {
        return res.status(500).json({ message: error });
      }
    }
  );

  res.json({ token });
};

exports.getToken = (req, res) => {
  mongoose.connection
    .collection("users")
    .findOne({ id: req.body.userId }, (error, data) => {
      if (error) {
        return res.status(500).json({ message: error });
      }

      res.json({ token: data.token });
    });
};
