const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

exports.generateToken = (req, res) => {
  // Génère le token avec des données arbitraires
  const token = jwt.sign(
    { userId: "arbitrary_user_id" },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  // Enregistre le token dans la base de données (ou autre système de stockage)
  mongoose.connection.collection("tokens").insertOne({ token });

  // Renvoie le token au client
  res.json({ token });
};

exports.verifyToken = (req, res, next) => {
  // Récupère le token dans le header de la requête
  const token = req.headers["x-acces-token"];

  // Vérifie si le token existe
  if (!token) {
    return res.status(403).json({ message: "Aucun token fourni" });
  }

  // Vérifie si le token est valide
  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ message: "Token invalide" });
    }

    // Vérifie si le token existe dans la base de données (ou autre système de stockage)
    mongoose.connection
      .collection("tokens")
      .findOne({ token }, (error, data) => {
        if (error) {
          return res.status(500).json({ message: error });
        }

        if (!data) {
          return res.status(403).json({ message: "Token invalide" });
        }

        // Stocke les données du token dans la requête
        req.token = decodedToken;

        // Passe à la suite
        next();
      });
  });
};
