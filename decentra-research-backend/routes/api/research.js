const express = require('express');
const {
  getResearch,
  getSingleResearch,
  createResearch,
  updateResearch,
  deleteResearch,
  citeResearch
} = require('../../controllers/researchController');

const router = express.Router();

router
  .route('/')
  .get(getResearch)
  .post(createResearch);

router
  .route('/:id')
  .get(getSingleResearch)
  .put(updateResearch)
  .delete(deleteResearch);

router
  .route('/:id/cite')
  .post(citeResearch);

// Test route
router.get('/test', (req, res) => {
  res.json({
    message: 'Research API is working with MongoDB',
    endpoints: {
      getAll: 'GET /api/research',
      getOne: 'GET /api/research/:id',
      create: 'POST /api/research',
      update: 'PUT /api/research/:id',
      delete: 'DELETE /api/research/:id',
      cite: 'POST /api/research/:id/cite'
    }
  });
});

module.exports = router;
