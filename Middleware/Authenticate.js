import Listing from "../Models/listing.js";
import Review from "../Models/reviews.js";


// Middleware to check if user is authenticated (logged in)
const isLoggedIn = (req, res, next) => {
  // Passport.js req.isAuthenticated() method
  if (!req.isAuthenticated()) {
    // 1. User के intended URL को save करें
    // जब user login कर लेगा, तो हम उसे यहीं वापस भेज देंगे
    req.session.returnTo = req.originalUrl;

    // 2. Flash message दें
    req.flash("error", "You must be logged in to create a new listing!");

    // 3. Login page पर redirect करें
    return res.redirect("/login");
  }
  // 4. अगर logged in है, तो next() function चलाएँ
  next();
};

// Middleware to save returnTo URL from session to res.locals
// ताकि login controller इसका इस्तेमाल कर सके
const saveRedirectUrl = (req, res, next) => {
  if (req.session.returnTo) {
    // res.locals में URL save करें ताकि login controller इसे access कर सके
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

const isowner = async(req, res, next)=> {
    // 1. Check if the user is authenticated (isLoggedIn middleware should be before this)
    if (!req.user) {
        req.flash("error", "You must be logged in to modify listings.");
        return res.redirect("/login"); 
    }

    let { id } = req.params; // Listing ID from the URL

    try {
        // 2. Find the listing using its ID
        let listing = await Listing.findById(id);

        if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
        }
        
        // 3. THE CORE CHECK (FIXED): Compare listing.owner with req.user._id using .equals()
        // Note: We use req.user._id, which is the standard place to find the logged-in user's ID.
        if (!listing.owner.equals(req.user._id)) {
            // अगर IDs match नहीं करती हैं (यूजर मालिक नहीं है)
            req.flash("error", "You are not the owner of this listing.");
            return res.redirect(`/listings/${id}`);
        }

        // 4. CRITICAL FIX: Authorization SUCCESSFUL - Go to the next middleware/controller
        next(); 

    } catch (err) {
        console.error("Error checking ownership:", err);
        req.flash("error", "An error occurred during ownership check.");
        res.redirect(`/listings/${id}`);
    }
}


const isReviewAuthor = async(req ,res , next)=>{
    const {id , reviewId } = req.params;
    let review = await Review.findById(reviewId);
    
    // Authorization Check
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash(
            "error",
            "You are the not the author of review"
        );
        return res.redirect(`/listings/${id}`);
    }
    next(); 
};


export { isLoggedIn, saveRedirectUrl , isowner , isReviewAuthor };
