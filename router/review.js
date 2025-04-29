const express = require("express");
const router = express.Router({ mergeParams: true });
const ExpressError = require("../utils/ExpressErrors.js");
const wrapAsync = require("../utils/wrapAsync");
const { reviewsschema } = require("../schema.js");
const listing = require("../model/listing.js");
const Review = require("../model/review.js");
const { Loginfunc } = require("../meddleware.js");

const NewReview = require("../Controllers/review.js");
const Distroy = require("../Controllers/review.js");

// Review routes POST
router.post("/", Loginfunc, wrapAsync(NewReview.CreateReview));

// Review routes DELETE

router.delete("/:reviewid", Loginfunc, wrapAsync(Distroy.DeleteReview));

module.exports = router;
