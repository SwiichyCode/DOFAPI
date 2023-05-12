const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.y0oklcm.mongodb.net/`;

async function connectDB() {
  try {
    await mongoose.connect(`${uri}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Lecture du fichier JSON
    const rawData = fs.readFileSync("./src/mocks/archimonstres.json");
    const archimonstres = JSON.parse(rawData);

    // Vérification des modifications dans le fichier JSON
    const existingArchimonstres = await mongoose.connection
      .collection("archimonstres")
      .find()
      .toArray();

    if (existingArchimonstres.length === 0) {
      // Aucun archimonstre existant dans la base de données

      // Insérer les données initiales dans la base de données
      await mongoose.connection
        .collection("archimonstres")
        .insertMany(archimonstres);
      console.log("Données initiales insérées dans la base de données");
    } else if (existingArchimonstres.length < archimonstres.length) {
      // Il y a eu des ajouts dans le fichier JSON

      // Renvoyer toutes les données du fichier JSON
      console.log("Des ajouts ont été détectés dans le fichier JSON");
      console.log("Renvoi de la totalité des données du fichier JSON");
      return archimonstres;
    }

    console.log("Connexion à la base de données MongoDB établie");
  } catch (error) {
    console.error("Erreur lors de la connexion à la base de données", error);
  }
}

module.exports = connectDB;
