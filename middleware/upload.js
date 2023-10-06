const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image/png, image/jpeg, and image/gif files are allowed"),
      false
    );
  }
};

const upload = multer({ fileFilter });

module.exports = upload;
