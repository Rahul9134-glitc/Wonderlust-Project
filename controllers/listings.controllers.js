import Listing from "../Models/listing.js";
import asyncHandler from "../config/asyncHandler.js";
import ApiError from "../config/ApiError.js";
import User from "../Models/user.js";

const getAllListings = asyncHandler(async (req, res, next) => {
  const listings = await Listing.find({});
  res.render("listings/index.ejs", { listings });
});

const getListingById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found.");
    throw new ApiError(404, "Listing not found.");
  }

  res.render("listings/show.ejs", { listing });
});

const rendernewfile = asyncHandler(async (req, res, next) => {
  res.render("listings/new.ejs");
});

const addnewListing = asyncHandler(async (req, res, next) => {
  let listingData = req.body.listing;

  // ⚡ Handle geometry
  if (listingData.geometry) {
    try {
      listingData.geometry = JSON.parse(listingData.geometry);

      // Convert coordinates to numbers
      listingData.geometry.coordinates = listingData.geometry.coordinates.map(Number);
    } catch (e) {
      console.error("Invalid geometry JSON", e);
      listingData.geometry = {
        type: "Point",
        coordinates: [0, 0]
      };
    }
  } else {
    listingData.geometry = {
      type: "Point",
      coordinates: [0, 0]
    };
  }

  // ⚡ Handle file upload
  if (req.file) {
    listingData.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  // Create listing
  const listing = new Listing(listingData);
  listing.owner = req.user._id;

  await listing.save();

  await User.findByIdAndUpdate(req.user._id , {
    $push : {listings : listing._id}
  });

  req.flash("success", "Listing added successfully.");
  res.redirect("/listings");
});


const editrenderform = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ApiError(404, "Listing to edit not found.");
  }

  req.flash("success", "Listing edited successfully.");


  res.render("listings/edit.ejs", { listing });
});

const updateListing = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    let listingData = req.body.listing;

    if (listingData.geometry) {
        try {
            listingData.geometry = JSON.parse(listingData.geometry);

            // Ensure coordinates are numbers
            listingData.geometry.coordinates = listingData.geometry.coordinates.map(Number);
        } catch (e) {
            console.error("Invalid geometry JSON", e);
            listingData.geometry = {
                type: "Point",
                coordinates: [0, 0],
            };
        }
    } else {
        listingData.geometry = {
            type: "Point",
            coordinates: [0, 0],
        };
    }

    const updatedListing = await Listing.findByIdAndUpdate(id, { ...listingData }, { new: true });

    if (!updatedListing) {
        throw new ApiError(404, "Listing to update not found.");
    }

    // ⚡ Handle file upload optionally
    if (req.file) {
        updatedListing.image = { url: req.file.path, filename: req.file.filename };
        await updatedListing.save();
    }

    req.flash("success", "Listing updated successfully.");
    res.redirect(`/listings/${id}`);
});


const deleteListing = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    throw new ApiError(404, "Listing to delete not found.");
  }
  req.flash("success", "Listing deleted successfully.");

  res.redirect("/listings");
});

export {
  getAllListings,
  getListingById,
  rendernewfile,
  addnewListing,
  editrenderform,
  updateListing,
  deleteListing,
};
