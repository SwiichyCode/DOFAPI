const mongoose = require("mongoose");
const fs = require("fs");
const uri =
  "mongodb+srv://swiichy:g5WWC2C48zplQHqo@cluster0.y0oklcm.mongodb.net/"; // Remplace avec l'URL de connexion à ta base de données MongoDB

async function connectDB() {
  try {
    await mongoose.connect(`${uri}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Lecture du fichier JSON
    const rawData = fs.readFileSync("./src/mocks/archimonstres.json");
    const archimonstres = JSON.parse(rawData);

    // Insertion des données dans la base de données

    await mongoose.connection
      .collection("archimonstres")
      .estimatedDocumentCount(async (err, count) => {
        if (!err && count === 0) {
          await mongoose.connection
            .collection("archimonstres")
            .insertMany(archimonstres);
        }
      });

    console.log("Connexion à la base de données MongoDB établie");
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données", error);
  }
}

module.exports = connectDB;
