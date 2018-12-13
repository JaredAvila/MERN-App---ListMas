const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// GET      /listItems/test
// Desc     tests listItems route
// Access   Public

router.get("/test", (req, res) => res.json({ message: "users works" }));

// POST      /listItems/register
// Desc     Register user
// Access   Public

router.post("/register", (req, res) => {
  // check validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).jsonp(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      // email already in DB
      return res.status(400).json(errors);
    } else {
      // unique email, creating user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log("error: ", err));
        });
      });
    }
  });
});

// GET       /listItems/login
// Desc       Login user/ return JWT token
// Access     Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      // email doesn't exist
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User is matched
        const payload = { id: user.id, name: user.name }; //JWT payload
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 11700 },
          (err, token) => {
            res.jsonp({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        // wrong password
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// GET      /users/current
// Desc     Return current user/Testing protected routes
// Access   Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
