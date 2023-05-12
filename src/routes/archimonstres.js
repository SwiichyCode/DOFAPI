const archimonstresController = require("../controllers/archimonstres");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/archimonstres", archimonstresController.getAllArchimonstres);
  app.get(
    "/api/archimonstres/etape/:step",
    archimonstresController.getArchimonstresByStep
  );
  app.get(
    "/api/archimonstres/nom/:name",
    archimonstresController.getArchimonstresByName
  );
};
