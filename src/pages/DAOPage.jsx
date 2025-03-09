import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Alert, ProgressBar, Table, Badge } from 'react-bootstrap'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { getResearchDAOContract } from '../services/blockchain/contracts'

const DAOPage = () => {
  const { account, library } = useWeb3React()
  const { isAuthenticated } = useSelector(state => state.auth)
  
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)
  const [votingLoading, setVotingLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  // New proposal form
  const [proposalTitle, setProposalTitle] = useState('')
  const [proposalDescription, setProposalDescription] = useState('')
  const [proposalSubmitting, setProposalSubmitting] = useState(false)
  
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true)
        // In a real implementation, you would fetch proposals from the blockchain
        // For now, we'll use mock data
        const mockProposals = [
          {
            id: 1,
            title: 'Increase Citation Rewards',
            description: 'Proposal to increase the reward amount for each citation from 10 tokens to 15 tokens.',
            proposer: '0x1234...5678',
            forVotes: 25000,
            againstVotes: 10000,
            startTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
            endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
            executed: false,
            hasVoted: false
          },
          {
            id: 2,
            title: 'Add New Verification Requirements',
            description: 'Proposal to require at least 3 peer verifications before a paper is considered fully verified.',
            proposer: '0x9876...4321',
            forVotes: 30000,
            againstVotes: 5000,
            startTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
            endTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
            executed: true,
            hasVoted: true
          },
          {
            id: 3,
            title: 'Implement Slashing for Bad Reviews',
            description: 'Proposal to implement a slashing mechanism for reviewers who provide low-quality or malicious reviews.',
            proposer: '0xabcd...ef01',
            forVotes: 15000,
            againstVotes: 18000,
            startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
            endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
            executed: false,
            hasVoted: true
          }
        ]
        
        setProposals(mockProposals)
      } catch (error) {
        console.error('Error fetching proposals:', error)
        setError('Failed to load DAO proposals')
      } finally {
        setLoading(false)
      }
    }
    
    fetchProposals()
  }, [])
  
  const handleVote = async (proposalId, support) => {
    if (!isAuthenticated) {
      setError('Please connect your wallet to vote')
      return
    }
    
    try {
      setVotingLoading(true)
      setError(null)
      setSuccess(null)
      
      // In a real implementation, you would call the smart contract to cast a vote
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update the local state
      setProposals(proposals.map(proposal => {
        if (proposal.id === proposalId) {
          const voteAmount = 1000 // Simulated vote weight
          return {
            ...proposal,
            forVotes: support ? proposal.forVotes + voteAmount : proposal.forVotes,
            againstVotes: !support ? proposal.againstVotes + voteAmount : proposal.againstVotes,
            hasVoted: true
          }
        }
        return proposal
      }))
      
      setSuccess(`Successfully voted ${support ? 'for' : 'against'} proposal #${proposalId}`)
    } catch (err) {
      setError(`Error voting on proposal: ${err.message}`)
    } finally {
      setVotingLoading(false)
    }
  }
  
  const handleSubmitProposal = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setError('Please connect your wallet to submit a proposal')
      return
    }
    
    if (!proposalTitle || !proposalDescription) {
      setError('Please fill in all required fields')
      return
    }
    
    try {
      setProposalSubmitting(true)
      setError(null)
      setSuccess(null)
      
      // In a real implementation, you would call the smart contract to create a proposal
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Add the new proposal to the local state
      const newProposal = {
        id: proposals.length + 1,
        title: proposalTitle,
        description: proposalDescription,
        proposer: account,
        forVotes: 0,
        againstVotes: 0,
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
        executed: false,
        hasVoted: false
      }
      
      setProposals([newProposal, ...proposals])
      
      // Reset form
      setProposalTitle('')
      setProposalDescription('')
      
      setSuccess('Your proposal has been successfully submitted')
    } catch (err) {
      setError(`Error submitting proposal: ${err.message}`)
    } finally {
      setProposalSubmitting(false)
    }
  }
  
  const isActive = (proposal) => {
    const now = new Date()
    const endTime = new Date(proposal.endTime)
    return !proposal.executed && now <= endTime
  }
  
  return (
    <Container className="py-5">
      <h1 className="mb-4">DAO Governance</h1>
      
      {!isAuthenticated && (
        <Alert variant="warning">
          Please connect your wallet to participate in DAO governance.
        </Alert>
      )}
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Row className="mb-5">
        <Col lg={8}>
          <Card>
            <Card.Header>Submit a New Proposal</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmitProposal}>
              <Form.Group className="mb-3">
                  <Form.Label>Proposal Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={proposalTitle}
                    onChange={(e) => setProposalTitle(e.target.value)}
                    disabled={proposalSubmitting || !isAuthenticated}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Proposal Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={proposalDescription}
                    onChange={(e) => setProposalDescription(e.target.value)}
                    disabled={proposalSubmitting || !isAuthenticated}
                    required
                  />
                </Form.Group>
                
                <Button 
                  type="submit" 
                  variant="primary"
                  disabled={proposalSubmitting || !isAuthenticated}
                >
                  {proposalSubmitting ? 'Submitting...' : 'Submit Proposal'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card>
            <Card.Header>DAO Statistics</Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Total Proposals:</span>
                  <span>{proposals.length}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Active Proposals:</span>
                  <span>{proposals.filter(p => isActive(p)).length}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Executed Proposals:</span>
                  <span>{proposals.filter(p => p.executed).length}</span>
                </div>
              </div>
              
              <div>
                <h6>Your Governance Power</h6>
                <p className="mb-1">1,000 Voting Power</p>
                <ProgressBar now={40} label="40%" className="mb-2" />
                <small className="text-muted">Based on your token holdings and participation</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <h2 className="mb-3">Active Proposals</h2>
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading proposals...</p>
        </div>
      ) : proposals.filter(p => isActive(p)).length === 0 ? (
        <Alert variant="info">
          There are currently no active proposals.
        </Alert>
      ) : (
        <div className="mb-5">
          {proposals.filter(p => isActive(p)).map(proposal => (
            <Card key={proposal.id} className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="mb-0">#{proposal.id}: {proposal.title}</h5>
                  <Badge bg="primary">Active</Badge>
                </div>
                
                <p>{proposal.description}</p>
                
                <div className="mb-3">
                  <small className="text-muted">
                    Proposed by: {proposal.proposer.substring(0, 6)}...{proposal.proposer.substring(proposal.proposer.length - 4)}
                  </small><br/>
                  <small className="text-muted">
                    Voting ends: {new Date(proposal.endTime).toLocaleString()}
                  </small>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span>For: {proposal.forVotes.toLocaleString()} votes</span>
                    <span>Against: {proposal.againstVotes.toLocaleString()} votes</span>
                  </div>
                  <ProgressBar>
                    <ProgressBar variant="success" now={proposal.forVotes / (proposal.forVotes + proposal.againstVotes) * 100 || 0} key={1} />
                    <ProgressBar variant="danger" now={proposal.againstVotes / (proposal.forVotes + proposal.againstVotes) * 100 || 0} key={2} />
                  </ProgressBar>
                </div>
                
                {proposal.hasVoted ? (
                  <div className="text-muted">You have already voted on this proposal</div>
                ) : (
                  <div className="d-flex gap-2">
                    <Button 
                      variant="success" 
                      onClick={() => handleVote(proposal.id, true)}
                      disabled={votingLoading || !isAuthenticated}
                    >
                      Vote For
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => handleVote(proposal.id, false)}
                      disabled={votingLoading || !isAuthenticated}
                    >
                      Vote Against
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      
      <h2 className="mb-3">Past Proposals</h2>
      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : proposals.filter(p => !isActive(p)).length === 0 ? (
        <Alert variant="info">
          There are no past proposals.
        </Alert>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Result</th>
              <th>For</th>
              <th>Against</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {proposals.filter(p => !isActive(p)).map(proposal => (
              <tr key={proposal.id}>
                <td>{proposal.id}</td>
                <td>{proposal.title}</td>
                <td>
                  {proposal.forVotes > proposal.againstVotes ? (
                    <Badge bg="success">Passed</Badge>
                  ) : (
                    <Badge bg="danger">Rejected</Badge>
                  )}
                </td>
                <td>{proposal.forVotes.toLocaleString()}</td>
                <td>{proposal.againstVotes.toLocaleString()}</td>
                <td>{new Date(proposal.endTime).toLocaleDateString()}</td>
                <td>
                  {proposal.executed ? (
                    <Badge bg="info">Executed</Badge>
                  ) : proposal.forVotes > proposal.againstVotes ? (
                    <Badge bg="warning" text="dark">Pending Execution</Badge>
                  ) : (
                    <Badge bg="secondary">Closed</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default DAOPage