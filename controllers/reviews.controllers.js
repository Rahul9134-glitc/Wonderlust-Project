import asyncHandler from "../config/asyncHandler.js";
import ApiError from "../config/ApiError.js";
import Listing from "../Models/listing.js";
import Review from "../Models/reviews.js";

const addReviewToListing = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  // 💡 FIX: Guardrail Check
  if (!listing) {
    throw new ApiError(404, "Listing not found. Cannot add review.");
  }

  let newReview = new Review(req.body.review);

  newReview.author = req.user._id;

  listing.reviews.push(newReview);

  console.log(newReview);

  req.flash("success", "Review added successfully.");

  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${id}`);
});

const deleteReviews = asyncHandler(async (req, res, next) => {
  const { id: listingId, reviewId } = req.params;

  const listing = await Listing.findById(listingId);
  if (!listing) {
    throw new ApiError(404, "Parent Listing not found for review deletion.");
  }

  await Listing.findByIdAndUpdate(listingId, {
    $pull: { reviews: reviewId },
  });
  const deletedReview = await Review.findByIdAndDelete(reviewId);

  if (!deletedReview) {
    throw new ApiError(404, "Review document not found.");
  }

  console.log(
    `Review ${reviewId} successfully deleted from Listing ${listingId}`
  );
  req.flash("success", "Review deleted successfully.");
  res.redirect(`/listings/${listingId}`);
});

export { addReviewToListing, deleteReviews };
