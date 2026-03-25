const Listing=require("../models/listing.js");
const Review=require("../models/Review.js")



module.exports.index=async(req,res)=>{
  

 const alllisting=  await Listing.find({});
 res.render("index",{alllisting}); 
}

module.exports.create = async (req, res) => {

    const listing = new Listing(req.body.listing);

    // Cloudinary se data yaha aata hai:
    listing.image = {
        url: req.file.path,        // secure_url from Cloudinary
        filename: req.file.filename   // public_id from Cloudinary
    };

    // OWNER SET KARO
    listing.Owner = req.user._id;

    await listing.save();

    req.flash("success", "New Listing Created!");
    res.redirect(`/listings/${listing._id}`);
};



module.exports.newlisting=async(req,res)=>{
res.render("new");

}


module.exports.Editlisting=async (req,res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);  

   let originalImageUrl = listing.image.url;
originalImageUrl = originalImageUrl.replace(
  "/upload",
  "/upload/h_300,w_250"
);
res.render("edit", {
  listing,
  originalImageUrl
});


}

module.exports.udatelisting=async (req, res) => {
    const { id } = req.params;
     console.log("Form Data:", req.body.listing);
    const updatedListing = req.body.listing; // from edit.ejs form
    await Listing.findByIdAndUpdate(id, updatedListing, { runValidators: true });
     req.flash("success","Edit successfully!!")
    res.redirect(`/listings/${id}`);
}


module.exports.deletelisting=async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
   req.flash("success","Deleted successfully!!")
  res.redirect("/listings");
}


module.exports.showlisting=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("Owner");  
    res.render("show", { listing });
}