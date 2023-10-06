const dotenv = require("dotenv");
dotenv.config();

var ImageKit = require("imagekit");
var imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
module.exports = imagekit;
