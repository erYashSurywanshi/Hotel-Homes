const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressErrors.js");


const listingview = require("./router/listing.js")
const reviews = require("./router/review.js")
// Connect to MongoDB
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Listing-Host");
}
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // Keep this only
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());



// 𝙏𝙝𝙞𝙨 𝙞𝙨 𝙡𝙞𝙨𝙩𝙞𝙣𝙜 & 𝙧𝙚𝙫𝙞𝙚𝙬 𝙧𝙤𝙪𝙩𝙚𝙧 𝙨𝙤 𝙗𝙚 𝙘𝙖𝙧𝙚𝙛𝙪𝙡𝙡 𝙬𝙞𝙩𝙝 𝙝𝙞𝙢

app.use("/listings", listingview)
app.use("/listings/:id/reviews", reviews)




// ⁡⁣⁢⁣𝗗͟𝗲͟𝗳͟𝗶͟𝗻͟𝗲 𝘁͟𝗵͟𝗲 𝘀͟𝗰͟𝗵͟𝗲͟𝗺͟𝗮 𝗳͟𝗼͟𝗿 𝘁͟𝗵͟𝗲 𝗹͟𝗶͟𝘀͟𝘁͟𝗶͟𝗻͟𝗴͟𝘀⁡
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// this is error handler
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!"}= err;// Default status code is 500 if not provided
  res.status(statusCode,message).render("err.ejs", { err });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
