const archimonstresController = require("../controllers/archimonstres");
const tokenController = require("../controllers/webToken");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/archimonstres",
    tokenController.verifyToken,
    archimonstresController.getAllArchimonstres
  );
  app.get(
    "/api/archimonstres/etape/:step",
    archimonstresController.getArchimonstresByStep
  );
  app.get(
    "/api/archimonstres/nom/:name",
    archimonstresController.getArchimonstresByName
  );
  app.get(
    "/api/archimonstres/zone/:zone",
    archimonstresController.getArchimonstresByZone
  );
  app.get(
    "/api/archimonstres/sous-zone/:sousZone",
    archimonstresController.getArchimonstresBySousZone
  );
};
