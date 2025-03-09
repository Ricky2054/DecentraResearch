import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge, Alert, Tabs, Tab, Form, ListGroup } from 'react-bootstrap'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { getResearchNFTContract, getCitationRewardsContract } from '../services/blockchain/contracts'
import { predictCitations } from '../services/ai/aiService'

const ResearchDetailPage = () => {
  const { id } = useParams()
  const { account, library } = useWeb3React()
  const { isAuthenticated } = useSelector(state => state.auth)
  
  const [paper, setPaper] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [buying, setBuying] = useState(false)
  const [citing, setCiting] = useState(false)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [predictions, setPredictions] = useState(null)
  const [predictionsLoading, setPredictionsLoading] = useState(false)
  
  useEffect(() => {
    const fetchPaperDetails = async () => {
      try {
        setLoading(true)
        // In a real implementation, you would fetch the paper details from the blockchain
        // For now, we'll use mock data
        const mockPaper = {
          id: parseInt(id),
          title: 'Blockchain-Based Academic Integrity Verification',
          abstract: 'This paper explores the use of blockchain technology for verifying academic integrity. We propose a decentralized system that can timestamp research papers, verify citations, and provide immutable proof of authorship. Our approach combines smart contracts with AI-powered plagiarism detection to create a comprehensive solution for academic publishing.',
          authors: ['John Doe', 'Jane Smith'],
          keywords: ['blockchain', 'academic integrity', 'verification', 'smart contracts'],
          pdfUrl: 'https://ipfs.io/ipfs/QmExample1',
          price: '0.05',
          verified: true,
          citations: 12,
          createdAt: '2023-05-15',
          owner: '0x1234...5678',
          references: [
            'Smith, J. (2022). Decentralized Academic Publishing. Journal of Blockchain Research, 5(2), 45-67.',
            'Johnson, A. & Williams, B. (2021). AI in Citation Analysis. Computational Linguistics Review, 8(3), 112-130.',
            'Brown, C. (2023). Smart Contracts for Intellectual Property. Blockchain Technology, 4(1), 23-41.'
          ],
          citedBy: [
            {
              id: 5,
              title: 'Enhancing Research Integrity with Blockchain',
              authors: ['Alice Johnson', 'Bob Williams'],
              date: '2023-06-18'
            },
            {
              id: 8,
              title: 'Decentralized Verification of Academic Credentials',
              authors: ['Charlie Brown'],
              date: '2023-07-22'
            }
          ]
        }
        
        setPaper(mockPaper)
        
        // Mock comments
        const mockComments = [
          {
            id: 1,
            author: '0xabcd...ef01',
            authorName: 'Researcher123',
            text: 'Great paper! The methodology is sound and the results are promising.',
            timestamp: '2023-05-20T14:32:00Z'
          },
          {
            id: 2,
            author: '0x9876...4321',
            authorName: 'AcademicReviewer',
            text: 'I appreciate the thorough literature review. However, I think the limitations section could be expanded.',
            timestamp: '2023-05-25T09:15:00Z'
          }
        ]
        
        setComments(mockComments)
      } catch (error) {
        console.error('Error fetching paper details:', error)
        setError('Failed to load research paper details')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPaperDetails()
  }, [id])
  
  const handleBuy = async () => {
    if (!isAuthenticated) {
      setError('Please connect your wallet to purchase this paper')
      return
    }
    
    try {
      setBuying(true)
      setError(null)
      
      // In a real implementation, you would call the smart contract to purchase the paper
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate success
      alert('Purchase successful! You now have access to the full paper.')
    } catch (err) {
      setError(`Error purchasing paper: ${err.message}`)
    } finally {
      setBuying(false)
    }
  }
  
  const handleCite = async () => {
    if (!isAuthenticated) {
      setError('Please connect your wallet to cite this paper')
      return
    }
    
    try {
      setCiting(true)
      setError(null)
      
      // In a real implementation, you would call the smart contract to add a citation
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update the local state
      setPaper({
        ...paper,
        citations: paper.citations + 1
      })
      
      alert('Citation added successfully! The author will receive rewards for your citation.')
    } catch (err) {
      setError(`Error adding citation: ${err.message}`)
    } finally {
      setCiting(false)
    }
  }
  
  const handleAddComment = (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setError('Please connect your wallet to add a comment')
      return
    }
    
    if (!comment.trim()) {
      return
    }
    
    // Add the new comment
    const newComment = {
      id: comments.length + 1,
      author: account,
      authorName: account.substring(0, 6) + '...' + account.substring(account.length - 4),
      text: comment,
      timestamp: new Date().toISOString()
    }
    
    setComments([...comments, newComment])
    setComment('')
  }
  
  const getPredictedCitations = async () => {
    if (!paper) return
    
    try {
      setPredictionsLoading(true)
      
      // In a real implementation, you would call the AI service
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock prediction results
      const mockPredictions = {
        estimatedCitations: 25,
        timeframe: '12 months',
        potentialJournals: [
          'Blockchain Technology Review',
          'Journal of Academic Integrity',
          'Digital Verification Studies'
        ],
        impactScore: 7.8,
        recommendations: [
          'Consider expanding the methodology section for more citations',
          'Add more case studies to increase practical relevance',
          'Collaborate with researchers in related fields for cross-disciplinary impact'
        ]
      }
      
      setPredictions(mockPredictions)
    } catch (error) {
      console.error('Error getting citation predictions:', error)
    } finally {
      setPredictionsLoading(false)
    }
  }
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading research paper details...</p>
      </Container>
    )
  }
  
  if (error && !paper) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          {error}
        </Alert>
        <Button as={Link} to="/marketplace" variant="primary">
          Back to Marketplace
        </Button>
      </Container>
    )
  }
  
  if (!paper) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Research paper not found
        </Alert>
        <Button as={Link} to="/marketplace" variant="primary">
          Back to Marketplace
        </Button>
      </Container>
    )
  }
  
  return (
    <Container className="py-5">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h1 className="mb-2">{paper.title}</h1>
              <p className="text-muted mb-2">
                By {paper.authors.join(', ')} • Published on {new Date(paper.createdAt).toLocaleDateString()}
              </p>
              <div className="mb-3">
                {paper.keywords.map((keyword, index) => (
                  <Badge bg="info" className="me-1" key={index}>{keyword}</Badge>
                ))}
                {paper.verified && (
                  <Badge bg="success" className="ms-2">Verified</Badge>
                )}
              </div>
            </div>
            <div className="text-end">
              <h4 className="mb-2">{paper.price} ETH</h4>
              <Button 
                variant="primary" 
                onClick={handleBuy}
                disabled={buying || !isAuthenticated}
              >
                {buying ? 'Processing...' : 'Purchase Access'}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <h5>Abstract</h5>
              <p>{paper.abstract}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Tabs defaultActiveKey="details" className="mb-4">
        <Tab eventKey="details" title="Details">
          <Card>
            <Card.Body>
              <Row>
                <Col md={8}>
                  <h5>References</h5>
                  <ol>
                    {paper.references.map((reference, index) => (
                      <li key={index} className="mb-2">{reference}</li>
                    ))}
                  </ol>
                  
                  <h5 className="mt-4">Cited By ({paper.citedBy.length})</h5>
                  {paper.citedBy.length > 0 ? (
                    <ul>
                      {paper.citedBy.map((citation, index) => (
                        <li key={index} className="mb-2">
                          <Link to={`/research/${citation.id}`}>
                            {citation.title}
                          </Link> by {citation.authors.join(', ')} ({new Date(citation.date).getFullYear()})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>This paper has not been cited yet.</p>
                  )}
                </Col>
                
                <Col md={4}>
                  <Card className="bg-light">
                    <Card.Body>
                      <h5>Paper Statistics</h5>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Citations:</span>
                        <span>{paper.citations}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Owner:</span>
                        <span>{paper.owner}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <span>Token ID:</span>
                        <span>#{paper.id}</span>
                      </div>
                      
                      <Button 
                        variant="outline-primary" 
                        className="w-100"
                        onClick={handleCite}
                        disabled={citing || !isAuthenticated}
                      >
                        {citing ? 'Processing...' : 'Cite This Paper'}
                      </Button>
                      
                      <div className="mt-3">
                        <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary w-100">
                          View PDF
                        </a>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="comments" title="Comments & Discussion">
          <Card>
            <Card.Body>
              <h5 className="mb-3">Discussion ({comments.length})</h5>
              
              {comments.length > 0 ? (
                <ListGroup className="mb-4">
                  {comments.map(comment => (
                    <ListGroup.Item key={comment.id}>
                      <div className="d-flex justify-content-between mb-1">
                        <strong>{comment.authorName}</strong>
                        <small className="text-muted">
                          {new Date(comment.timestamp).toLocaleString()}
                        </small>
                      </div>
                      <p className="mb-0">{comment.text}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-muted mb-4">No comments yet. Be the first to start the discussion!</p>
              )}
              
              <Form onSubmit={handleAddComment}>
                <Form.Group className="mb-3">
                  <Form.Label>Add a Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!isAuthenticated}
                    placeholder={isAuthenticated ? "Share your thoughts on this research..." : "Connect your wallet to comment"}
                  />
                </Form.Group>
                
                <Button 
                  type="submit" 
                  variant="primary"
                  disabled={!isAuthenticated || !comment.trim()}
                >
                  Post Comment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
        
        <Tab eventKey="ai" title="AI Insights">
          <Card>
            <Card.Body>
              <h5 className="mb-3">AI-Powered Citation Predictions</h5>
              
              {!predictions && !predictionsLoading && (
                <div className="text-center py-3">
                  <p>Get AI-powered insights about the potential impact of this research paper.</p>
                  <Button 
                    variant="primary" 
                    onClick={getPredictedCitations}
                    disabled={predictionsLoading}
                  >
                    Generate Predictions
                  </Button>
                </div>
              )}
              
              {predictionsLoading && (
                <div className="text-center py-3">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3">Analyzing research paper and generating predictions...</p>
                </div>
              )}
              
              {predictions && (
                <Row>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Body>
                        <h6>Citation Forecast</h6>
                        <p className="display-4 text-center">{predictions.estimatedCitations}</p>
                        <p className="text-center text-muted">Estimated citations in the next {predictions.timeframe}</p>
                      </Card.Body>
                    </Card>
                    
                    <Card>
                      <Card.Body>
                        <h6>Potential Journals</h6>
                        <ul>
                          {predictions.potentialJournals.map((journal, index) => (
                            <li key={index}>{journal}</li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Body>
                        <h6>Impact Score</h6>
                        <div className="text-center mb-2">
                          <span className="display-4">{predictions.impactScore}</span>
                          <span className="text-muted">/10</span>
                        </div>
                        <div className="progress mb-2">
                          <div 
                            className="progress-bar bg-success" 
                            role="progressbar" 
                            style={{ width: `${predictions.impactScore * 10}%` }}
                            aria-valuenow={predictions.impactScore * 10} 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </Card.Body>
                    </Card>
                    
                    <Card>
                      <Card.Body>
                        <h6>Recommendations to Increase Impact</h6>
                        <ul>
                          {predictions.recommendations.map((recommendation, index) => (
                            <li key={index}>{recommendation}</li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  )
}

export default ResearchDetailPage