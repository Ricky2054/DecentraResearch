import React from 'react'
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <Container className="py-5">
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 mb-4">DecentraResearch</h1>
            <p className="lead mb-4">
              A decentralized AI-powered research platform ensuring academic integrity through blockchain technology.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Button as={Link} to="/submit" variant="primary" size="lg">Submit Research</Button>
              <Button as={Link} to="/marketplace" variant="outline-primary" size="lg">Explore Marketplace</Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="text-center mb-4">Key Features</h2>
        </Col>
      </Row>

      <Row className="mb-5 g-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>AI-Powered Citation & Plagiarism Detection</Card.Title>
              <Card.Text>
                Utilize AI and NLP to scan research papers for improper citations and plagiarism, comparing against a decentralized blockchain database of verified research.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Blockchain-Based Immutable Research Records</Card.Title>
              <Card.Text>
                Timestamp and store research papers on the blockchain to ensure authorship proof and prevent fraud or tampering.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Smart Contracts for Citation Rewards</Card.Title>
              <Card.Text>
                Trigger micropayments to authors when their work is cited, incentivizing fair recognition of contributions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Decentralized Peer Review System</Card.Title>
              <Card.Text>
                Allow researchers to peer-review papers on a decentralized network. AI assigns trust scores to sources, identifying fake or unreliable research.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>NFT-Based Research Ownership</Card.Title>
              <Card.Text>
                Mint research papers as NFTs for ownership proof. Authors can license their work via smart contracts, earning fees from usage.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>DAO Governance</Card.Title>
              <Card.Text>
                Govern the platform through a Decentralized Autonomous Organization (DAO) with a voting system to improve policies and prevent biased reviews.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <Alert variant="info">
            <h4>Join Our Research Community</h4>
            <p>
              Connect your wallet to start submitting research, earning rewards for citations, and participating in peer reviews.
            </p>
            <Button variant="primary">Connect Wallet</Button>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage