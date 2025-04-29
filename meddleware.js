const Listing = require("./model/listing.js");
const Review = require("./model/review");
const { listingschema } = require("./schema.js");
module.exports.Loginfunc =(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl =req.originalUrl;
        req.flash("error", "You must be logged in")
        return res.redirect("/login")
    }
    next();
}

module.exports.RedirectPath = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}  

module.exports.isReviewAuthor =async (req, res, next)=>{
    let {id, reviewId} =req.params;
    const review = await Review.findById(reviewId);
    if(!review.Author.equals(res.locals.Userdata._id)){
        req.flash("error", "You are not authorized to do that!")
        return res.redirect(`/listings/${id}`)
    }
    next();
}
module.exports.validationListing = (req, res, next) => {
    let { error } = listingschema.validate(req.body);
    if (error) {
      throw new ExpressError(error, 400); // Correct: status code is a number
    } else {
      next();
    }
  };