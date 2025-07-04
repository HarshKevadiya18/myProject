const mongoose = require("mongoose");
const review = require("./review.js");
const Schema = mongoose.Schema; // for shortCut purpose
const Review = require("./review.js");
const { required, ref } = require("joi");
const User = require("./user.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: {
    url: String,
    filename: String,
  },

  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: String,
    enum: [
      "rooms",
      "iconic_cities",
      "mountains",
      "castles",
      "amazing_pools",
      "camping",
      "farms",
      "arctic",
      "domes",
      "boats",
    ],
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

// image: {
//     type: String,
//     required: true,
//     default:
//       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     set: (v) =>
//        !v || v.trim() === ""
//         ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         : v,
//   },
