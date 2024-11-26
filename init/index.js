const mongoose = require('mongoose');
const listing = require("../model/listing.js");
const dataDB = require("./data.js");


async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Listing-Host");
  }
  main()
    .then((res) => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      err;
    });

 const initDB =async ()=>{
    await listing.deleteMany({});
    await listing.insertMany(dataDB.data);
    console.log("Database initialized with sample data.");
 }

 initDB();
 console.log(initDB())