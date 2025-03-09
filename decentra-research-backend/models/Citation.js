const mongoose = require('mongoose');

const CitationSchema = new mongoose.Schema({
  citingPaper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Research',
    required: true
  },
  citedPaper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Research',
    required: true
  },
  transactionHash: {
    type: String,
    required: true
  },
  rewardClaimed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Citation', CitationSchema);