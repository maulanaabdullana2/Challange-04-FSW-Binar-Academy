const express = require("express");
const morgan = require("morgan");
const flash = require("connect-flash");
const app = express();
const CarsRoutes = require("./Routes/CarsRoutes");
const session = require("express-session");
const formatDate = require("./utils/update");
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.locals.formatDate = formatDate;
  next();
});

app.use(
  session({
    secret: "geeksforgeeks",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

app.use("/", CarsRoutes);

module.exports = app;
