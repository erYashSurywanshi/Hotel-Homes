const listing = require("../model/listing");
const Review = require("../model/review");


module.exports.CreateReview =async (req, res) => {
    const foundListing = await listing.findById(req.params.id);
    const newReview = new Review(req.body.review);
    newReview.Author = req.user._id;
    foundListing.reviews.push(newReview);
    
    await newReview.save();
    await foundListing.save();
    req.flash("success", "New Review is Created!")
    res.redirect(`/listings/${foundListing.id}`);
  }

module.exports.DeleteReview =async (req, res) => {
    let { id, reviewid } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await listing.findByIdAndDelete(reviewid);
    req.flash("success", " Review is Deleted!")
    res.redirect(`/listings/${id}`);
  }