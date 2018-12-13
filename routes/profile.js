const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateProfile = require("../validation/profile");
const validateItem = require("../validation/item");

// Load Profile Model
const Profile = require("../models/Profile");
// Load User Model
const User = require("../models/User");

// GET      /profile/
// Desc     Return current users profile
// Access   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", "name")
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// Route   GET profile/all
// Desc    Get all profiles
// Access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", "name")
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// Route   GET profile/handle/:handle
// Desc    Get profile by handle
// Access  Public

router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", "name")
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// Route   GET profile/user/:user_id
// Desc    Get profile by user ID
// Access  Public

router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", "name")
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

// POST      /profile/
// Desc     Create user profile
// Access   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfile(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.imgUrl) profileFields.imgUrl = req.body.imgUrl;
    if (req.body.bio) profileFields.bio = req.body.bio;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// Route   POST profile/friends/:friend_id
// Desc    Add friend to profile.friends
// Access  Private

router.post(
  "/friend/:friend_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.friend_id)
      .then(friend => {
        Profile.findOne({ user: req.user.id })
          .then(profile => {
            // Add to exp array
            profile.friends.unshift({
              friend: {
                name: friend.name,
                friendId: friend.id
              }
            });
            // update profile and save
            profile.save().then(profile => res.json(profile));
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
  }
);

// Route   DELETE profile/friend/:friend_id
// Desc    Delete experience from profile
// Access  Private
router.delete(
  "/friend/:friend_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.friends
          .map(friend => friend.friend.friendId)
          .indexOf(req.params.friend_id);

        // Splice out of array
        profile.friends.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// Route   POST profile/listItem
// Desc    Add item to list
// Access  Private
router.post(
  "/listItem",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Validation
    const { errors, isValid } = validateItem(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newItem = {
          title: req.body.title,
          importance: req.body.importance
        };
        //Add new item to list
        profile.userWishList.unshift(newItem);
        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => console.log(err));
  }
);

// Route   POST profile/listItem/check/:profile_id/:item_id
// Desc    Check an item on the list
// Access  Private
router.post(
  "/listItem/check/:profile_id/:item_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.profile_id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.userWishList
          .map(item => item.id)
          .indexOf(req.params.item_id);

        //is item checked?
        if (!profile.userWishList[removeIndex].checked) {
          //Set information to new list item
          const newItem = {
            title: profile.userWishList[removeIndex].title,
            importance: profile.userWishList[removeIndex].importance,
            checked: true
          };

          // Splice out of array
          profile.userWishList.splice(removeIndex, 1);

          //Add new item to list
          profile.userWishList.splice(removeIndex, 0, newItem);

          //Save
          profile.save().then(profile => res.json(profile));
        }
      })
      .catch(err => console.log(err));
  }
);
// Route   POST profile/listItem/unCheck/:profile_id/:item_id
// Desc    unCheck an item on the list
// Access  Private
router.post(
  "/listItem/unCheck/:profile_id/:item_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ _id: req.params.profile_id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.userWishList
          .map(item => item.id)
          .indexOf(req.params.item_id);

        //is item checked?
        if (profile.userWishList[removeIndex].checked) {
          //Set information to new list item
          const newItem = {
            title: profile.userWishList[removeIndex].title,
            importance: profile.userWishList[removeIndex].importance,
            checked: false
          };

          // Splice out of array
          profile.userWishList.splice(removeIndex, 1);

          //Add new item to list
          profile.userWishList.splice(removeIndex, 0, newItem);

          //Save
          profile.save().then(profile => res.json(profile));
        }
      })
      .catch(err => console.log(err));
  }
);

// Route   DELETE profile/listItem/:item_id
// Desc    Delete education from profile
// Access  Private
router.delete(
  "/listItem/:item_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.userWishList
          .map(item => item.id)
          .indexOf(req.params.item_id);

        // Splice out of array
        profile.userWishList.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// Route   POST profile/:friend/:item
// Desc    Add item to list
// Access  Private
router.post(
  "/checked/:friend/:item",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newItem = {
          item: req.params.item,
          friend: req.params.friend
        };
        //Add new item to list
        profile.checkedItems.unshift(newItem);
        //Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => console.log(err));
  }
);

// Route   DELETE profile/checked/:checked_id
// Desc    Delete education from profile
// Access  Private
router.delete(
  "/checked/:checked_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.checkedItems
          .map(item => item.id)
          .indexOf(req.params.checked_id);

        // Splice out of array
        profile.checkedItems.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// Route   DELETE profile
// Desc    Delete user and profile
// Access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
