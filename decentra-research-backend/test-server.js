const express = require('express');
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS if needed
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'DecentraResearch API is working!',
    version: '1.0.0',
    status: 'online'
  });
});

// Test route for research API
app.get('/api/research/test', (req, res) => {
  res.json({ 
    message: 'Research API endpoint is working',
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

// Mock research data for testing
const mockResearch = [
  {
    id: 1,
    title: 'Blockchain-Based Academic Integrity Verification',
    abstract: 'This paper explores the use of blockchain technology for verifying academic integrity...',
    authors: ['John Doe', 'Jane Smith'],
    keywords: ['blockchain', 'academic integrity', 'verification'],
    owner: '0x1234567890123456789012345678901234567890',
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'AI-Powered Plagiarism Detection in Research Papers',
    abstract: 'We present a novel approach to plagiarism detection using advanced AI techniques...',
    authors: ['Alice Johnson', 'Bob Williams'],
    keywords: ['AI', 'plagiarism', 'research'],
    owner: '0x2345678901234567890123456789012345678901',
    createdAt: new Date().toISOString()
  }
];

// Get all research papers
app.get('/api/research', (req, res) => {
  res.json(mockResearch);
});

// Get single research paper
app.get('/api/research/:id', (req, res) => {
  const research = mockResearch.find(r => r.id === parseInt(req.params.id));
  if (!research) {
    return res.status(404).json({ message: 'Research not found' });
  }
  res.json(research);
});

// Create research paper
app.post('/api/research', (req, res) => {
  const { title, abstract, authors, keywords, owner } = req.body;
  
  // Validate required fields
  if (!title || !abstract || !authors || !owner) {
    return res.status(400).json({ message: 'Please provide title, abstract, authors, and owner' });
  }
  
  const newResearch = {
    id: mockResearch.length + 1,
    title,
    abstract,
    authors: Array.isArray(authors) ? authors : [authors],
    keywords: keywords || [],
    owner,
    createdAt: new Date().toISOString()
  };
  
  // In a real app, we would save to database here
  mockResearch.push(newResearch);
  
  res.status(201).json(newResearch);
});

// Update research paper
app.put('/api/research/:id', (req, res) => {
  const research = mockResearch.find(r => r.id === parseInt(req.params.id));
  if (!research) {
    return res.status(404).json({ message: 'Research not found' });
  }
  
  // Check ownership
  if (research.owner !== req.body.owner) {
    return res.status(403).json({ message: 'Not authorized to update this research' });
  }
  
  // Update fields
  const updatedResearch = {
    ...research,
    title: req.body.title || research.title,
    abstract: req.body.abstract || research.abstract,
    authors: req.body.authors || research.authors,
    keywords: req.body.keywords || research.keywords,
    updatedAt: new Date().toISOString()
  };
  
  // In a real app, we would update in database here
  const index = mockResearch.findIndex(r => r.id === parseInt(req.params.id));
  mockResearch[index] = updatedResearch;
  
  res.json(updatedResearch);
});

// Delete research paper
app.delete('/api/research/:id', (req, res) => {
  const research = mockResearch.find(r => r.id === parseInt(req.params.id));
  if (!research) {
    return res.status(404).json({ message: 'Research not found' });
  }
  
  // Check ownership
  if (research.owner !== req.body.owner) {
    return res.status(403).json({ message: 'Not authorized to delete this research' });
  }
  
  // In a real app, we would delete from database here
  const index = mockResearch.findIndex(r => r.id === parseInt(req.params.id));
  mockResearch.splice(index, 1);
  
  res.json({ message: 'Research deleted successfully' });
});

// Cite research paper
app.post('/api/research/:id/cite', (req, res) => {
  const research = mockResearch.find(r => r.id === parseInt(req.params.id));
  if (!research) {
    return res.status(404).json({ message: 'Research not found' });
  }
  
  // In a real app, we would update citation count in database
  res.json({ 
    message: 'Citation added successfully',
    research: research
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/`);
  console.log(`Research API test endpoint: http://localhost:${PORT}/api/research/test`);
});