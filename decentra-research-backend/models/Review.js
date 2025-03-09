const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  research: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Research',
    required: true
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  verified: {
    type: Boolean,
    default: false
  },
  transactionHash: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', ReviewSchema);