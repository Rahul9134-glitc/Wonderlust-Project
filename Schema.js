import joi from "joi";

const listingSchema = joi.object({
  listings: joi.object({ 
    title: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required().min(0),
    country: joi.string().required(),
    location: joi.string().required(),
    image: joi.string().allow("", null),
    geometry: joi.object({
      type: joi.string().valid("Point").required(),
      coordinates: joi.array().length(2).items(joi.number()).required()
    }).required()
  }).required() 
});

const reviewsSchema = joi.object({
  review: joi.object({ 
    comment: joi.string().required(),
    rating: joi.number().required().min(1).max(5)
  }).required()   
});

export { listingSchema, reviewsSchema };
