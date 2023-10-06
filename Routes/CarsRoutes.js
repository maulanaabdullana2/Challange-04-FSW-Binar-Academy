const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = require("../middleware/upload");

const CarsControllers = require("../Controllers/carsControllers");

router.route("/").get(CarsControllers.admincarspage);
router.route("/create").get(CarsControllers.createpage);
router.route("/add").post((req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res.render("create", {
        error: "Terjadi kesalahan saat mengunggah berkas.",
      });
    } else if (err) {
      res.render("create", { error: err.message });
    } else {
      CarsControllers.createCars(req, res);
    }
  });
});
router.route("/delete/:id").get(CarsControllers.removeCars);
router.route("/edit/:id").get(CarsControllers.editPage);
router.route("/update/:id").post((req, res, next) => {
  upload.single("image")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      res
        .status(400)
        .json({ error: "Terjadi kesalahan saat mengunggah berkas." });
    } else if (err) {
      res.status(500).json({ error: err.message });
    } else {
      CarsControllers.editCars(req, res);
    }
  });
});

module.exports = router;
