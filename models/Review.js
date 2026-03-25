const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number, // should be Number, not String
    min: 1,
    max: 5,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // auto-set the current date
  }
});

module.exports = mongoose.model("Review", ReviewSchema)
