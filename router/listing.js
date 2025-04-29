const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingschema } = require("../schema.js");
const listing = require("../model/listing.js");
const { Loginfunc, validationListing } = require("../meddleware.js");
const PostSend = require("../Controllers/listing.js")
const IndexListing = require("../Controllers/listing.js");
const ListingId = require("../Controllers/listing.js");
const New = require("../Controllers/listing.js");
const Edit = require("../Controllers/listing.js");
const EditPut = require("../Controllers/listing.js");
const deleteRoute = require("../Controllers/listing.js");

const multer = require("multer");
const {storage} =require("../cloudConfig.js")
const upload = multer({storage});

router
  .route("/")
  .get(wrapAsync(IndexListing.Index))
  .post(upload.single("listing[image]"),validationListing, wrapAsync(PostSend.NewPost));
  
router.get("/new", Loginfunc, New.NewList);

router
  .route("/:id")
  .get(wrapAsync(ListingId.ListId))
  .delete(Loginfunc, wrapAsync(deleteRoute.DestoryRoute))
  .put(Loginfunc,upload.single("listing[image]"), validationListing, wrapAsync(EditPut.PutEditRoute));

// ⁡⁢⁣⁢4Update request for show data⁡
router.get("/:id/edit", Loginfunc, wrapAsync(Edit.EditCurrRoute));

module.exports = router;
