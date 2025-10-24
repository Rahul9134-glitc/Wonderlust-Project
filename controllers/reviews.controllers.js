import asyncHandler from "../config/asyncHandler.js";
import ApiError from "../config/ApiError.js";
import Listing from "../Models/listing.js";
import Review from "../Models/reviews.js"; 

/**
 * Adds a new review to a specific listing.
 */
const addReviewToListing = asyncHandler(async (req, res, next) => {;
    const { id } = req.params;
    console.log(id);
    const listing = await Listing.findById(id);


    // 💡 FIX: Guardrail Check
    if (!listing) {
        // Agar listing nahi mili, toh 404 error throw karo.
        // Yeh error Global Error Handler se handle hoga.
        throw new ApiError(404, "Listing not found. Cannot add review.");
    }

    // New review document banao
    let newReview = new Review(req.body.review);
    
    newReview.author = req.user._id;
    // console.log(newReview);

    // Listing ke reviews array mein naya review object daal do.
    // (Yeh line ab safe hai kyunki humne check kar liya ki listing null nahi hai)
    listing.reviews.push(newReview);

    console.log(newReview);

    req.flash("success", "Review added successfully.");

    await newReview.save();
    await listing.save();

    console.log("Review added successfully!");
    // Review add hone ke baad user ko show page par redirect karein
    res.redirect(`/listings/${id}`); 
});

// Assuming deleteReviews is also in this file
const deleteReviews = asyncHandler(async (req, res, next) => {
    const { id: listingId, reviewId } = req.params;

    // Check agar listing exists karti hai, optional hai par accha hai
    const listing = await Listing.findById(listingId);
    if (!listing) {
        throw new ApiError(404, "Parent Listing not found for review deletion.");
    }

    // $pull operator Mongoose array se reviewId ko hata deta hai।
    await Listing.findByIdAndUpdate(listingId, { 
        $pull: { reviews: reviewId } 
    });

    // Delete the actual Review document
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
        throw new ApiError(404, "Review document not found.");
    }

    console.log(`Review ${reviewId} successfully deleted from Listing ${listingId}`);
    req.flash("success", "Review deleted successfully.");
    res.redirect(`/listings/${listingId}`);
});

export { addReviewToListing, deleteReviews };
