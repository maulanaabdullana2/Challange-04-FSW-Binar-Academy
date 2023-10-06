const imagekit = require("../middleware/imageKit");
const Cars = require("../models/carsModels");
const admincarspage = async (req, res) => {
  try {
    const category = req.query.category;
    const nameQuery = req.query.name;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (nameQuery) {
      filter.name = { $regex: nameQuery, $options: "i" };
    }

    const car = await Cars.find(filter);
    res.render("index", {
      category,
      car,
      message: req.flash("message", ""),
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

const createpage = async (req, res) => {
  try {
    res.render("create");
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const createCars = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const file = req.file;

    const img = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    const car = new Cars({
      name,
      price,
      category,
      image: img.url,
    });
    await car.save();
    req.flash("message", "Ditambah");
    res.redirect("/");
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const editPage = async (req, res) => {
  try {
    const car = await Cars.findById(req.params.id);
    res.render("edit", {
      car,
    });
  } catch (error) {
    res.status(404).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const editCars = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, price, category } = req.body;
    const existingCar = await Cars.findById(id);

    let newImage = existingCar.image;

    if (req.file) {
      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });

      newImage = uploadResponse.url;
    }

    await Cars.findByIdAndUpdate(
      id,
      {
        name,
        price,
        category,
        image: newImage,
      },
      {
        new: true,
      }
    );
    req.flash("message", "Diupdate");
    res.redirect("/");
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const removeCars = async (req, res) => {
  try {
    await Cars.findByIdAndRemove(req.params.id);
    req.flash("message", "Dihapus");
    res.redirect("/");
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

module.exports = {
  admincarspage,
  createpage,
  createCars,
  removeCars,
  editPage,
  editCars,
};
