const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressErrors.js");
const wrapAsync = require("../utils/wrapAsync");
const { listingschema } = require("../schema.js");
const listing = require("../model/listing.js")

// Create a new instance of the router
const validationListing =(req, res, next) => {
    let {error} =listingschema.validate(req.body)
    if (error) {
      throw new ExpressError(error, 400);  // Correct: status code is a number
    }else{
      next();
    }
  } 

router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
  });
  
  // Get all listings
  router.get("/", wrapAsync(async (req, res) => {
    const allListings = await listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));
  
  // Get listing by ID
  router.get("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listIteams = await listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listIteams });
  }));
  
  // Post request for new listing
  router.post("/", 
  validationListing,
  wrapAsync(async (req, res) => {
    let newListing = new listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }));
  // ⁡⁢⁣⁢4Update request for show data⁡
  router.get(
    "/:id/edit",
    wrapAsync(async (req, res) => {
      const { id } = req.params;
      const listIteams = await listing.findById(id);
      res.render("listings/edit.ejs", { listIteams });
    })
  );
  
  //⁡⁢⁣⁢delete route⁡
  router.delete(
    "/:id",
    wrapAsync(async (req, res) => {
      const { id } = req.params;
      const deletelisting = await listing.findByIdAndDelete(id);
      res.redirect("/listings");
    })
  );
  // ⁡⁢⁣⁢5Update request for show data⁡
  router.put(
    "/:id",
    validationListing,
    wrapAsync(async (req, res) => {
      const { id } = req.params;
      await listing.findByIdAndUpdate(id, { ...req.body.listing });
      res.redirect(`/listings/${id}`);
    })
  );

  module.exports = router;