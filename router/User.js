const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../model/User");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { RedirectPath } = require("../meddleware.js");

const SighUp = require("../Controllers/User.js");
const SighUpPost = require("../Controllers/User.js");
const LogIn = require("../Controllers/User.js");
const LogInPost = require("../Controllers/User.js");
const LogOut = require("../Controllers/User.js");

router
  .route("/SignUp")
  .get(SighUp.UserSignUp)
  .post(wrapAsync(SighUpPost.UserSignUpPost));

router
  .route("/Login")
  .get(LogIn.UserLogIn)
  .post(
    RedirectPath,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    LogInPost.UserLoginPost
  );


  
router.get("/Logout", LogOut.UserLogOut);

module.exports = router;
