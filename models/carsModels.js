const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Cars = mongoose.model("Car", carsSchema);

module.exports = Cars;
