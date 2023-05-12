const mongoose = require("mongoose");

const archimonstreSchema = new mongoose.Schema({
  nom: String,
  etape: Number,
  zone: String,
  sousZone: String,
  imgURL: String,
});

const Archimonstre = mongoose.model("Archimonstre", archimonstreSchema);

module.exports = Archimonstre;
