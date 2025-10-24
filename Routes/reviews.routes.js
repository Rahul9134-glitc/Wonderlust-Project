import express from "express";
import { addReviewToListing, deleteReviews } from "../controllers/reviews.controllers.js";
import { validateReview } from "../Middleware/SchemaValidation.js";
import { isLoggedIn  ,  isReviewAuthor} from "../Middleware/Authenticate.js";
const router = express.Router({ mergeParams: true }); 

router.post("/", isLoggedIn,  validateReview, addReviewToListing);
router.delete("/:reviewId", isLoggedIn ,  isReviewAuthor, deleteReviews);

export default router;