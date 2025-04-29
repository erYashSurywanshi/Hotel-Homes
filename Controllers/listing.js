const listing = require("../model/listing");

module.exports.Index = async (req, res) => {
  const allListings = await listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.ListId = async (req, res) => {
  const { id } = req.params;
  const listIteams = await listing.findById(id)
    .populate({ path: "reviews", populate: { path: "Author" } })
    .populate("Owner");
  res.render("listings/show.ejs", { listIteams });
};

module.exports.NewList = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.NewPost =async (req, res) => {

   let url =req.file.path;
   let filename = req.file.filename;
    let newListing = new listing(req.body.listing);
    newListing.Owner = req.user._id;
    newListing.image ={url,filename}
    
    await newListing.save();
   

    req.flash("success", "New Listing is Created!");
    res.redirect("/listings");
  }

module.exports.EditCurrRoute =async (req, res) => {
    const { id } = req.params;
    const listIteams = await listing.findById(id);
    if(!listIteams){
        req.flash("error", "This listing is not exist")
        res.render("/listings")
    }
    res.render("listings/edit.ejs", { listIteams });
  }
module.exports.PutEditRoute = async (req, res) => {
    const { id } = req.params;
    let Listing =await listing.findByIdAndUpdate(id, { ...req.body.listing });
 
    if(typeof req.file !=="undefined"){
      let url =req.file.path;
    let filename = req.file.filename;
    Listing.image = {url,filename}
    await Listing.save();
    }
    req.flash("success", " Listing is Updated!");
    res.redirect(`/listings/${id}`);
  }

module.exports.DestoryRoute =async (req, res) => {
    const { id } = req.params;
    const deletelisting = await listing.findByIdAndDelete(id);
    req.flash("success", " Listing is Deleted!");
    res.redirect("/listings");
  }