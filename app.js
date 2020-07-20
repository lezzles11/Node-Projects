var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var nodemailer = require("nodemailer");
var exphbs = require("express-handlebars");
var logger = require("morgan");

var app = express();

// View engine is the template you are using
// Can define the layouts
// dirname always points to root directory

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
// Folder name is views

// Set it up as the view engine

// Parses json if you want
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", function (req, res) {
  console.log("This will show up on the console");
  // server -> sending back to client
  res.render("home");
});

app.listen(3000);
console.log("Server running on port 3000");
