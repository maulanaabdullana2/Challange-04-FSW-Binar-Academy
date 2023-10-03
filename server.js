const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;
const database = process.env.DATABASE_URI;

mongoose
  .connect(database, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database Berhasil Terkoneksi");
  });

app.listen(port, () => {
  console.log(`App Running on ${port}`);
});
