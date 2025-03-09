const mongoose = require('mongoose');

const ResearchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  abstract: {
    type: String,
    required: [true, 'Please add an abstract'],
    maxlength: [5000, 'Abstract cannot be more than 5000 characters']
  },
  authors: [{
    type: String,
    required: true
  }],
  keywords: [{
    type: String,
    trim: true
  }],
  pdfUrl: String,
  ipfsHash: String,
  owner: {
    type: String,
    required: true
  },
  citations: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Research', ResearchSchema);
