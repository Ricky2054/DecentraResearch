const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  nonce: {
    type: String,
    required: true
  },
  isVerifiedResearcher: {
    type: Boolean,
    default: false
  },
  research: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Research'
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);