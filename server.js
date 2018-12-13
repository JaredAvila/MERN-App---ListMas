const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/users");
const profile = require("./routes/profile");

const app = express();

app.get("/", (req, res) => res.send("hello"));

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// connect to DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB Connected."))
  .catch(err => console.log("Error: ", err));

//Passport Middleware
app.use(passport.initialize());
//Passport Config
require("./config/passport")(passport);

//User routes
app.use("/users", users);
app.use("/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("running on port: ", port));
