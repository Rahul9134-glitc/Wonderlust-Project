import { listingSchema , reviewsSchema } from "../Schema.js";


const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        throw new ApiError(400, errMsg); 
    } else {
        next();
    }
};


const validateReview = (req, res, next) => {
    const { error } = reviewsSchema.validate(req.body);

    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        throw new ApiError(400, errMsg);
    } else {
        next();
    }
};
export {validateListing , validateReview}

