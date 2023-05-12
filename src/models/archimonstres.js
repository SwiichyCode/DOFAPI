const mongoose = require("mongoose");

const archimonstreSchema = new mongoose.Schema({
  nom: String,
  etape: Number,
  zone: String,
  "sous-zone": String,
});

const Archimonstre = mongoose.model("Archimonstre", archimonstreSchema);

module.exports = Archimonstre;
