const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

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
  .connect(db)
  .then(() => console.log("mongoDB Connected."))
  .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());
//Passport Config
require("./config/passport")(passport);

//User routes
app.use("/users", users);
app.use("/profile", profile);

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("running on port: ", port));
