const mongoose = require("mongoose");
const Review=require("./Review")
const user=require("./users.js")

const schema = mongoose.Schema;

const listingSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
     url:String,
    filename: String,
   
  },

  price: {
  type: Number,
   default:0,
},

  location: String,
  country: String,
Review:[{
    
   type: mongoose.Schema.Types.ObjectId,  
    ref: "Review",
}],
Owner:{
    
   type: mongoose.Schema.Types.ObjectId,  
    ref: "User",
},


});

const Listing = mongoose.model("Listing", listingSchema); // ✅ fixed

module.exports = Listing;
