var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

var app = express();

// View engine is the template you are using
// Can define the layouts
// dirname always points to root directory

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Set it up as the view engine

// Parses json if you want
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  console.log("This will show up on the console");
  // server -> sending back to client
  res.render("index");
});

app.get("/contact", function (req, res) {
  console.log("Rendering contact form ");
  // server -> sending back to client
  res.render("contact");
});

app.get("/about", function (req, res) {
  console.log("Rendering contact form ");
  // server -> sending back to client
  res.render("about");
});

var mailOptions = {
  from: "Lesley <crappyfirstdrafts123@gmail.com",
  to: "lesley.c@xccelerate.co",
  subject: "yo",
  text: "is this working",
  html: "<p>yoyoyoy</p>",
};
app.post("/contact/send", function (req, res) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "crappyfirstdrafts123@gmail.com",
      pass: "ASDF1234!!",
    },
  });
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.redirect("/");
    } else {
      console.log("Message sent" + info.response);
      res.resdirect("/");
    }
  });
  console.log("Testing post contact/send");
});
app.listen(3000);
console.log("Server running on port 3000");
