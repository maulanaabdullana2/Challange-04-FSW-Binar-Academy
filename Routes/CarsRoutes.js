const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const CarsControllers = require("../Controllers/carsControllers");

router.route("/").get(CarsControllers.admincarspage);
router.route("/create").get(CarsControllers.createpage);
router.route("/add").post(upload.single("image"), CarsControllers.createCars);
router.route("/delete/:id").get(CarsControllers.removeCars);
router.route("/edit/:id").get(CarsControllers.editPage);
router
  .route("/update/:id")
  .post(upload.single("image"), CarsControllers.editCars);

module.exports = router;
