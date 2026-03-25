const express = require("express");
const router = express.Router();

const wrapasync = require("../Eror/wrapasync.js");
const Exception = require("../Eror/Exception.js");
const Listing=require("../models/listing.js");
const Review=require("../models/Review.js")
const { isLoggedIn, isOwner } = require("../middleware.js");

const reviewcontroller=require("../controllers/review.js")

 // add the revew in schema 

router.post("/listings/:id/review", isLoggedIn,wrapasync(reviewcontroller.reviewadd));

//delete review in schmea 

router.delete("/listings/:id/reviews/:reviewId",isLoggedIn,isOwner,wrapasync(reviewcontroller.reviewdelete));

module.exports = router;