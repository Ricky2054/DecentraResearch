const Research = require('../models/Research');
const asyncHandler = require('../middleware/async');

// @desc    Get all research papers
// @route   GET /api/research
// @access  Public
exports.getResearch = asyncHandler(async (req, res) => {
  const research = await Research.find().sort('-createdAt');
  
  res.status(200).json({
    success: true,
    count: research.length,
    data: research
  });
});

// @desc    Get single research paper
// @route   GET /api/research/:id
// @access  Public
exports.getSingleResearch = asyncHandler(async (req, res) => {
  const research = await Research.findById(req.params.id);
  
  if (!research) {
    return res.status(404).json({
      success: false,
      error: 'Research not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: research
  });
});

// @desc    Create new research paper
// @route   POST /api/research
// @access  Public
exports.createResearch = asyncHandler(async (req, res) => {
  const research = await Research.create(req.body);
  
  res.status(201).json({
    success: true,
    data: research
  });
});

// @desc    Update research paper
// @route   PUT /api/research/:id
// @access  Public
exports.updateResearch = asyncHandler(async (req, res) => {
  let research = await Research.findById(req.params.id);
  
  if (!research) {
    return res.status(404).json({
      success: false,
      error: 'Research not found'
    });
  }
  
  // Check ownership
  if (research.owner !== req.body.owner) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to update this research'
    });
  }
  
  // Update the updatedAt field
  req.body.updatedAt = Date.now();
  
  research = await Research.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  res.status(200).json({
    success: true,
    data: research
  });
});

// @desc    Delete research paper
// @route   DELETE /api/research/:id
// @access  Public
exports.deleteResearch = asyncHandler(async (req, res) => {
  const research = await Research.findById(req.params.id);
  
  if (!research) {
    return res.status(404).json({
      success: false,
      error: 'Research not found'
    });
  }
  
  // Check ownership
  if (research.owner !== req.body.owner) {
    return res.status(403).json({
      success: false,
      error: 'Not authorized to delete this research'
    });
  }
  
  await research.remove();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Add citation to research paper
// @route   POST /api/research/:id/cite
// @access  Public
exports.citeResearch = asyncHandler(async (req, res) => {
  const research = await Research.findById(req.params.id);
  
  if (!research) {
    return res.status(404).json({
      success: false,
      error: 'Research not found'
    });
  }
  
  // Increment citation count
  research.citations += 1;
  await research.save();
  
  res.status(200).json({
    success: true,
    message: 'Citation added successfully',
    data: research
  });
});
