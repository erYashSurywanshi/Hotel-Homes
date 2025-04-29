const User = require("../model/User");

module.exports.UserSignUp = (req, res) => {
  res.render("User/SignUp.ejs");
};
module.exports.UserSignUpPost = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const NewUser = new User({ username, email });
    const registeredUser = await User.register(NewUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", " Welcome to wonderlust!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/SignUp");
  }
};

module.exports.UserLogIn = (req, res) => {
  res.render("User/Login.ejs");
};

module.exports.UserLoginPost = (req, res) => {
  req.flash("success", "Welcome to the World of Wonderlust!");
  const redirect = res.locals.redirectUrl || "/listings";
  res.redirect(redirect);
};

module.exports.UserLogOut = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash("success", "User is Logged Out!");
    res.redirect("/listings");
  });
};
