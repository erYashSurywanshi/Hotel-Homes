const mongoose = require('mongoose');
const { listingschema } = require('../schema');
const Review = require('./review.js')
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: String,
    image: {
       url: String,
       filename: String 
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews:[
            {
                type: Schema.Types.ObjectId,
                ref: "Review"
            },
          ],
    Owner:
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    
       
});

//⁡⁣⁢⁢ ⁡⁣⁢⁣𝘁𝗵𝗶𝘀 𝗶𝘀 𝗳𝗼𝗿 𝗮𝗳𝘁𝗲𝗿 𝗱𝗲𝗹𝗲𝘁𝗶𝗻𝗴 𝗹𝗶𝘀𝘁𝗶𝘁𝗲𝗮𝗺 𝘄𝗶𝘁𝗵 𝘁𝗵𝗮𝘁 𝗶𝗻 𝗱𝗯𝘀 𝗿𝗲𝘃𝗶𝗲𝘄 𝗮𝗹𝘀𝗼 𝗵𝗮𝘀 𝘁𝗼 𝗱𝗲𝗹𝗲𝘁𝗲⁡

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
