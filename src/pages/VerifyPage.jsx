import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Alert, Badge, ProgressBar } from 'react-bootstrap'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { getResearchNFTContract } from '../services/blockchain/contracts'

const VerifyPage = () => {
  const { account, library } = useWeb3React()
  const { isAuthenticated } = useSelector(state => state.auth)
  
  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  useEffect(() => {
    const fetchPapersForReview = async () => {
      try {
        setLoading(true)
        // In a real implementation, you would fetch unverified papers from the blockchain
        // For now, we'll use mock data
        const mockPapers = [
          {
            id: 3,
            title: 'Decentralized Peer Review Systems',
            abstract: 'This study analyzes the effectiveness of decentralized peer review systems in academic publishing...',
            authors: ['Charlie Brown', 'Diana Miller'],
            keywords: ['peer review', 'decentralized', 'academic publishing'],
            pdfUrl: 'https://ipfs.io/ipfs/QmExample3',
            verified: false,
            reviewCount: 1,
            createdAt: '2023-07-10'
          },
          {
            id: 4,
            title: 'Smart Contracts for Academic Citation Rewards',
            abstract: 'This paper proposes a novel system for rewarding academic citations using smart contracts...',
            authors: ['Eve Wilson', 'Frank Thomas'],
            keywords: ['smart contracts', 'citations', 'rewards'],
            pdfUrl: 'https://ipfs.io/ipfs/QmExample4',
            verified: false,
            reviewCount: 0,
            createdAt: '2023-08-05'
          }
        ]
        
        setPapers(mockPapers)
      } catch (error) {
        console.error('Error fetching papers for review:', error)
        setError('Failed to load papers for review')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPapersForReview()
  }, [])
  
  const handleVerify = async (paperId) => {
    if (!isAuthenticated) {
      setError('Please connect your wallet to verify papers')
      return
    }
    
    try {
      setVerifying(true)
      setError(null)
      setSuccess(null)
      
      // In a real implementation, you would call the smart contract to verify the paper
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update the local state
      setPapers(papers.map(paper => 
        paper.id === paperId ? { ...paper, reviewCount: paper.reviewCount + 1 } : paper
      ))
      
      setSuccess(`Successfully submitted your verification for paper #${paperId}`)
    } catch (err) {
      setError(`Error verifying paper: ${err.message}`)
    } finally {
      setVerifying(false)
    }
  }
  
  return (
    <Container className="py-5">
      <h1 className="mb-4">Verify & Review Research</h1>
      
      {!isAuthenticated && (
        <Alert variant="warning">
          Please connect your wallet to participate in the peer review process.
        </Alert>
      )}
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <p className="mb-4">
        As a peer reviewer, you play a crucial role in maintaining the quality and integrity of research on our platform. 
        Review the papers below, check for accuracy, methodology, and proper citations.
      </p>
      
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading papers for review...</p>
        </div>
      ) : papers.length === 0 ? (
        <Alert variant="info">
          There are currently no papers awaiting verification.
        </Alert>
      ) : (
        <Row className="g-4">
          {papers.map(paper => (
            <Col md={6} key={paper.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{paper.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {paper.authors.join(', ')}
                  </Card.Subtitle>
                  
                  <Card.Text>
                    {paper.abstract.substring(0, 200)}...
                  </Card.Text>
                  
                  <div className="mb-3">
                    {paper.keywords.map((keyword, index) => (
                      <Badge bg="info" className="me-1" key={index}>{keyword}</Badge>
                    ))}
                  </div>
                  
                  <div className="mb-3">
                    <small className="text-muted">Published: {paper.createdAt}</small><br/>
                    <small className="text-muted">Current Reviews: {paper.reviewCount}</small>
                  </div>
                  
                  <div className="d-flex gap-2">
                    <Button 
                      href={paper.pdfUrl} 
                      target="_blank" 
                      variant="outline-primary"
                    >
                      View PDF
                    </Button>
                    <Button 
                      onClick={() => handleVerify(paper.id)} 
                      variant="success"
                      disabled={verifying}
                    >
                      {verifying ? 'Verifying...' : 'Verify & Review'}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      
      <Card className="mt-5">
        <Card.Header>Verification Guidelines</Card.Header>
        <Card.Body>
          <h5>When reviewing a paper, please check for:</h5>
          <ul>
            <li>Accuracy of information and methodology</li>
            <li>Proper citations and references</li>
            <li>Originality and contribution to the field</li>
            <li>Clarity and quality of writing</li>
            <li>Ethical considerations</li>
          </ul>
          <p>
            Your honest and thorough reviews help maintain the integrity of our research platform.
            Reviewers earn reputation points and tokens for quality reviews.
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default VerifyPage