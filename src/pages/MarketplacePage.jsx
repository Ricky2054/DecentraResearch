import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { getResearchNFTContract } from '../services/blockchain/contracts'

const MarketplacePage = () => {
  const { account, library } = useWeb3React()
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        setLoading(true)
        // In a real implementation, you would fetch papers from the blockchain
        // For now, we'll use mock data
        const mockPapers = [
          {
            id: 1,
            title: 'Blockchain-Based Academic Integrity Verification',
            abstract: 'This paper explores the use of blockchain technology for verifying academic integrity...',
            authors: ['John Doe', 'Jane Smith'],
            keywords: ['blockchain', 'academic integrity', 'verification'],
            price: '0.05',
            verified: true,
            citations: 12,
            createdAt: '2023-05-15'
          },
          {
            id: 2,
            title: 'AI-Powered Plagiarism Detection in Research Papers',
            abstract: 'We present a novel approach to plagiarism detection using advanced AI techniques...',
            authors: ['Alice Johnson', 'Bob Williams'],
            keywords: ['AI', 'plagiarism', 'research'],
            price: '0.03',
            verified: true,
            citations: 8,
            createdAt: '2023-06-22'
          },
          {
            id: 3,
            title: 'Decentralized Peer Review Systems',
            abstract: 'This study analyzes the effectiveness of decentralized peer review systems in academic publishing...',
            authors: ['Charlie Brown', 'Diana Miller'],
            keywords: ['peer review', 'decentralized', 'academic publishing'],
            price: '0.02',
            verified: false,
            citations: 3,
            createdAt: '2023-07-10'
          }
        ]
        
        setPapers(mockPapers)
      } catch (error) {
        console.error('Error fetching papers:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPapers()
  }, [])

  const filteredPapers = papers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          paper.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    
    if (filter === 'all') return matchesSearch
    if (filter === 'verified') return matchesSearch && paper.verified
    if (filter === 'unverified') return matchesSearch && !paper.verified
    
    return matchesSearch
  })

  return (
    <Container className="py-5">
      <h1 className="mb-4">Research Marketplace</h1>
      
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <Form.Control
              placeholder="Search by title, author, keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Papers</option>
            <option value="verified">Verified Only</option>
            <option value="unverified">Unverified Only</option>
          </Form.Select>
        </Col>
      </Row>
      
      <Row className="g-4">
        {loading ? (
          <Col>Loading research papers...</Col>
        ) : filteredPapers.length === 0 ? (
          <Col>No research papers found matching your criteria.</Col>
        ) : (
          filteredPapers.map(paper => (
            <Col md={4} key={paper.id}>
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title>{paper.title}</Card.Title>
                    {paper.verified ? (
                      <Badge bg="success">Verified</Badge>
                    ) : (
                      <Badge bg="warning" text="dark">Unverified</Badge>
                    )}
                  </div>
                  
                  <Card.Subtitle className="mb-2 text-muted">
                    {paper.authors.join(', ')}
                  </Card.Subtitle>
                  
                  <Card.Text className="mb-2">
                    {paper.abstract.substring(0, 150)}...
                  </Card.Text>
                  
                  <div className="mb-3">
                    {paper.keywords.map((keyword, index) => (
                      <Badge bg="info" className="me-1" key={index}>{keyword}</Badge>
                    ))}
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small className="text-muted">Citations: {paper.citations}</small><br/>
                      <small className="text-muted">Published: {paper.createdAt}</small>
                    </div>
                    <div className="text-end">
                      <div className="mb-2">{paper.price} ETH</div>
                      <Button as={Link} to={`/research/${paper.id}`} variant="primary" size="sm">View Details</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  )
}

export default MarketplacePage