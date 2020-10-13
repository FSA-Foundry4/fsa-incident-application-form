var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var nunjucks = require("nunjucks");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var yourDetailsRouter = require("./routes/your-details");

// var companyTypeRouter = require("./lookupMocks/company-type");
var countryRouter = require("./lookupMocks/country");
var notifierTypeRouter = require("./lookupMocks/notifier-type");
var productTypeRouter = require("./lookupMocks/product-type");
var unitsRouter = require("./lookupMocks/units");

var app = express();

// view engine setup
nunjucks.configure("views", {
  express: app,
  autoescape: true,
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "njk");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/your-details", yourDetailsRouter);

// app.use("/lookup/companyType", companyTypeRouter);
app.use("/lookup/country", countryRouter);
app.use("/lookup/notifierType", notifierTypeRouter);
app.use("/lookup/productType", productTypeRouter);
app.use("/lookup/units", unitsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;