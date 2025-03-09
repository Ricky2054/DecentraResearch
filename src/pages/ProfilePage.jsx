import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Badge, Tabs, Tab, Alert, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { getResearchNFTContract, getCitationRewardsContract } from '../services/blockchain/contracts'

const ProfilePage = () => {
  const { account, library } = useWeb3React()
  const { isAuthenticated } = useSelector(state => state.auth)
  
  const [papers, setPapers] = useState([])
  const [citations, setCitations] = useState([])
  const [rewards, setRewards] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [claimingRewards, setClaimingRewards] = useState(false)
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) return
      
      try {
        setLoading(true)
        // In a real implementation, you would fetch the user's papers and citations from the blockchain
        // For now, we'll use mock data
        
        // Mock user's papers
        const mockPapers = [
          {
            id: 1,
            title: 'Blockchain-Based Academic Integrity Verification',
            abstract: 'This paper explores the use of blockchain technology for verifying academic integrity...',
            createdAt: '2023-05-15',
            citations: 12,
            verified: true
          },
          {
            id: 7,
            title: 'Smart Contract Patterns for Research Collaboration',
            abstract: 'This paper presents design patterns for smart contracts that facilitate research collaboration...',
            createdAt: '2023-08-03',
            citations: 5,
            verified: true
          }
        ]
        
        // Mock citations
        const mockCitations = [
          {
            id: 1,
            citingPaperId: 5,
            citingPaperTitle: 'Enhancing Research Integrity with Blockchain',
            citingPaperAuthors: ['Alice Johnson', 'Bob Williams'],
            date: '2023-06-18',
            rewarded: true,
            rewardAmount: '10'
          },
          {
            id: 2,
            citingPaperId: 8,
            citingPaperTitle: 'Decentralized Verification of Academic Credentials',
            citingPaperAuthors: ['Charlie Brown'],
            date: '2023-07-22',
            rewarded: true,
            rewardAmount: '10'
          },
          {
            id: 3,
            citingPaperId: 12,
            citingPaperTitle: 'AI and Blockchain for Citation Analysis',
            citingPaperAuthors: ['Diana Miller', 'Eve Wilson'],
            date: '2023-08-15',
            rewarded: false,
            rewardAmount: '10'
          }
        ]
        
        // Mock rewards data
        const mockRewards = {
          totalEarned: '170',
          claimed: '120',
          unclaimed: '50',
          tokenSymbol: 'DRES'
        }
        
        setPapers(mockPapers)
        setCitations(mockCitations)
        setRewards(mockRewards)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setError('Failed to load your profile data')
      } finally {
        setLoading(false)
      }
    }
    
    fetchUserData()
  }, [isAuthenticated, account])
  
  const handleClaimRewards = async () => {
    if (!isAuthenticated) {
      setError('Please connect your wallet to claim rewards')
      return
    }
    
    try {
      setClaimingRewards(true)
      setError(null)
      
      // In a real implementation, you would call the smart contract to claim rewards
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update the local state
      setRewards({
        ...rewards,
        claimed: (parseFloat(rewards.claimed) + parseFloat(rewards.unclaimed)).toString(),
        unclaimed: '0'
      })
      
      // Update citations to mark all as rewarded
      setCitations(citations.map(citation => ({
        ...citation,
        rewarded: true
      })))
      
      alert('Rewards claimed successfully!')
    } catch (err) {
      setError(`Error claiming rewards: ${err.message}`)
    } finally {
      setClaimingRewards(false)
    }
  }
  
  if (!isAuthenticated) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Please connect your wallet to view your profile.
        </Alert>
      </Container>
    )
  }
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your profile data...</p>
      </Container>
    )
  }
  
  return (
    <Container className="py-5">
      <h1 className="mb-4">Your Profile</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <div className="text-center mb-3">
                <div className="rounded-circle bg-primary text-white d-inline-flex justify-content-center align-items-center" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                  {account.substring(2, 4).toUpperCase()}
                </div>
                <h5 className="mt-3 mb-1">Researcher</h5>
                <p className="text-muted mb-0">
                  {account.substring(0, 6)}...{account.substring(account.length - 4)}
                </p>
              </div>
              
              <hr />
              
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Papers Published:</span>
                  <span>{papers.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Citations:</span>
                  <span>{citations.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Verification Status:</span>
                  <Badge bg="success">Verified Researcher</Badge>
                </div>
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>Citation Rewards</Card.Header>
            <Card.Body>
              <div className="text-center mb-3">
                <h3>{rewards.totalEarned} {rewards.tokenSymbol}</h3>
                <p className="text-muted">Total Rewards Earned</p>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Claimed:</span>
                <span>{rewards.claimed} {rewards.tokenSymbol}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Unclaimed:</span>
                <span>{rewards.unclaimed} {rewards.tokenSymbol}</span>
              </div>
              
              <Button 
                variant="primary" 
                className="w-100"
                onClick={handleClaimRewards}
                disabled={claimingRewards || parseFloat(rewards.unclaimed) === 0}
              >
                {claimingRewards ? 'Claiming...' : `Claim ${rewards.unclaimed} ${rewards.tokenSymbol}`}
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Tabs defaultActiveKey="papers" className="mb-3">
            <Tab eventKey="papers" title="Your Papers">
              {papers.length === 0 ? (
                <Alert variant="info">
                  You haven't published any papers yet. <Link to="/submit">Submit your first research paper</Link>.
                </Alert>
              ) : (
                <div>
                  {papers.map(paper => (
                    <Card key={paper.id} className="mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <Card.Title>
                            <Link to={`/research/${paper.id}`} className="text-decoration-none">
                              {paper.title}
                            </Link>
                          </Card.Title>
                          {paper.verified ? (
                            <Badge bg="success">Verified</Badge>
                          ) : (
                            <Badge bg="warning" text="dark">Pending Verification</Badge>
                          )}
                        </div>
                        
                        <Card.Text>
                          {paper.abstract.substring(0, 150)}...
                        </Card.Text>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <small className="text-muted">Published: {new Date(paper.createdAt).toLocaleDateString()}</small><br/>
                            <small className="text-muted">Citations: {paper.citations}</small>
                          </div>
                          <Button as={Link} to={`/research/${paper.id}`} variant="outline-primary" size="sm">
                            View Details
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Tab>
            
            <Tab eventKey="citations" title="Citations & Rewards">
              {citations.length === 0 ? (
                <Alert variant="info">
                  Your papers haven't been cited yet. Citations will appear here when other researchers cite your work.
                </Alert>
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Citing Paper</th>
                      <th>Authors</th>
                      <th>Date</th>
                      <th>Reward</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {citations.map(citation => (
                      <tr key={citation.id}>
                        <td>
                          <Link to={`/research/${citation.citingPaperId}`}>
                            {citation.citingPaperTitle}
                          </Link>
                        </td>
                        <td>{citation.citingPaperAuthors.join(', ')}</td>
                        <td>{new Date(citation.date).toLocaleDateString()}</td>
                        <td>{citation.rewardAmount} {rewards.tokenSymbol}</td>
                        <td>
                          {citation.rewarded ? (
                            <Badge bg="success">Rewarded</Badge>
                          ) : (
                            <Badge bg="warning" text="dark">Pending</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Tab>
            
            <Tab eventKey="activity" title="Recent Activity">
              <ListGroup>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Paper Cited</strong>
                      <p className="mb-0 text-muted">Your paper "Blockchain-Based Academic Integrity Verification" was cited by "AI and Blockchain for Citation Analysis"</p>
                    </div>
                    <small className="text-muted">3 days ago</small>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Rewards Claimed</strong>
                      <p className="mb-0 text-muted">You claimed 20 DRES tokens from citation rewards</p>
                    </div>
                    <small className="text-muted">1 week ago</small>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Paper Published</strong>
                      <p className="mb-0 text-muted">You published "Smart Contract Patterns for Research Collaboration"</p>
                    </div>
                    <small className="text-muted">2 weeks ago</small>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Paper Verified</strong>
                      <p className="mb-0 text-muted">Your paper "Smart Contract Patterns for Research Collaboration" was verified by peer reviewers</p>
                    </div>
                    <small className="text-muted">2 weeks ago</small>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  )
}

export default ProfilePage