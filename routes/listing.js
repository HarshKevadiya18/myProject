const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
} = require("../views/middleware.js");
const lisingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); //multer storage ma file ne save karshe

router
  .route("/")
  .get(wrapAsync(lisingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(lisingController.createListing)
  );

// New Route
router.get("/new", isLoggedIn, lisingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(lisingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(lisingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(lisingController.destroyListing));

// Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(lisingController.renderEditForm)
);

router.get(
  "/category/:categoryName",
  wrapAsync(lisingController.filterListings)
);

module.exports = router;
