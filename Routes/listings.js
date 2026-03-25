const express = require("express");
const router = express.Router();
const multer  = require('multer')
const {storage}=require("../cloudconfig.js")

const upload = multer({ storage});


const wrapasync = require("../Eror/wrapasync.js");
const Exception = require("../Eror/Exception.js");
const Listing=require("../models/listing.js");
const Review=require("../models/Review.js")
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingcontroller = require("../controllers/listnig.js");


//index route

router.get("/",  wrapasync( listingcontroller.index));


// CREATE LISTING
 router.post("/", isLoggedIn,
    upload.single("listing[image]"),
  wrapasync(listingcontroller.create));


//cerate new listing route
router.get("/new" , isLoggedIn,wrapasync(listingcontroller.newlisting));



//edit route
router.get("/:id/edit",  isLoggedIn,isOwner, wrapasync(listingcontroller.Editlisting ));


//update route

router.put("/:id",  isLoggedIn, wrapasync(listingcontroller.udatelisting));



//Delete Route
router.delete("/:id", isLoggedIn,isOwner, wrapasync (listingcontroller.deletelisting));


//show
router.get("/:id", wrapasync(listingcontroller.showlisting));



module.exports = router;

