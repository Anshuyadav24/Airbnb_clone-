const Listing=require("../models/listing.js");
const Review=require("../models/Review.js")


module.exports.reviewadd=async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const newReview = new Review({ rating, comment });
  await newReview.save();

  const listing = await Listing.findById(id).populate("Owner");

  listing.Review.push(newReview);
  await listing.save();

  res.render("show", { listing });
}


module.exports.reviewdelete= async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
  $pull: { Review: reviewId }
});

    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
}