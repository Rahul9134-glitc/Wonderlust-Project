import express from 'express';
import { addnewListing, editrenderform, getAllListings , getListingById, rendernewfile ,updateListing , deleteListing } from '../controllers/listings.controllers.js';
const router = express.Router();
import {validateListing} from "../Middleware/SchemaValidation.js"
import { isLoggedIn , isowner } from '../Middleware/Authenticate.js';
import { storage } from '../config/Cloudinary.js';
import multer from "multer"

const upload = multer({
    storage
});


router.route('/')
    .get(getAllListings)
    .post(
        isLoggedIn, 
        validateListing, 
        upload.single("listing[image]"),
        addnewListing
    );
    

router.get("/new" ,isLoggedIn, rendernewfile);

router.route("/:id")
    .get(getListingById)
    .put(
        isLoggedIn, 
        validateListing,
        isowner, 
        upload.single("listing[image]"),
        updateListing
    )
    .delete(
        isLoggedIn, 
        isowner, 
        deleteListing
    );

router.get("/:id/edit" ,isLoggedIn , editrenderform);

export default router;
