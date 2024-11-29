const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressErrors.js");
const wrapAsync = require("../utils/wrapAsync");
const { reviewsschema } = require("../schema.js");
const listing = require("../model/listing.js");
const Review = require("../model/review.js");
const reviewsvalidation = (req, res, next) => {
  let { error } = reviewsschema.validate(req.body);
  if (error) {
    throw new ExpressError(error, 400); // Correct: status code is a number
  } else {
    next();
  }
};

// Review routes POST
router.post(
  "/",
  reviewsvalidation,
  wrapAsync(async (req, res) => {
    const foundListing = await listing.findById(req.params.id);
    const newReview = new Review(req.body.review);

    foundListing.reviews.push(newReview);
    
    await newReview.save();
    await foundListing.save();
    req.flash("success", "New Review is Created!")
    res.redirect(`/listings/${foundListing.id}`);
  })
);

// Review routes DELETE

router.delete(
  "/:reviewid",
  wrapAsync(async (req, res) => {
    let { id, reviewid } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await listing.findByIdAndDelete(reviewid);
    req.flash("success", " Review is Deleted!")
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
