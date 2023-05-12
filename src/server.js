const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const port = 3000;

const limiter = rateLimit({
  windowMs: 60 * 1000, // Période en millisecondes (1 minute)
  max: 1000, // Nombre maximal de requêtes autorisées
  keyGenerator: (req) => {
    return req.ip; // Utilise l'adresse IP de l'utilisateur comme identifiant
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", limiter);

app.use("/", (req, res, next) => {
  res.redirect("/api/archimonstres");
});

require("./routes/archimonstres")(app);

app.use((err, req, res, next) => {
  if (err instanceof rateLimit.RateLimitExceeded) {
    res.status(429).send("Too many requests");
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);

  connectDB();
});
