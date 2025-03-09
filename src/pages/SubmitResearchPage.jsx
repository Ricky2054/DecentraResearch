import React, { useState } from 'react'
import { Container, Form, Button, Card, Alert, Spinner, ProgressBar } from 'react-bootstrap'
import { useWeb3React } from '@web3-react/core'
import { useSelector } from 'react-redux'
import { uploadToIPFS, uploadJSONToIPFS } from '../services/ipfs/ipfsService'
import { getResearchNFTContract } from '../services/blockchain/contracts'
import { checkPlagiarism, validateCitations } from '../services/ai/aiService'

const SubmitResearchPage = () => {
  const { account, library } = useWeb3React()
  const { isAuthenticated } = useSelector(state => state.auth)
  
  const [title, setTitle] = useState('')
  const [abstract, setAbstract] = useState('')
  const [authors, setAuthors] = useState('')
  const [keywords, setKeywords] = useState('')
  const [pdfFile, setPdfFile] = useState(null)
  const [citationStyle, setCitationStyle] = useState('APA')
  
  const [loading, setLoading] = useState(false)
  const [aiChecking, setAiChecking] = useState(false)
  const [aiResults, setAiResults] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPdfFile(e.target.files[0])
    }
  }

  const handleAICheck = async (e) => {
    e.preventDefault()
    
    if (!abstract) {
      setError('Please provide an abstract for AI checking')
      return
    }
    
    try {
      setAiChecking(true)
      setError(null)
      
      // Check for plagiarism
      const plagiarismResults = await checkPlagiarism(abstract)
      
      // Validate citations
      const citationResults = await validateCitations(abstract, citationStyle)
      
      setAiResults({
        plagiarism: plagiarismResults,
        citations: citationResults
      })
      
    } catch (err) {
      setError('Error during AI check: ' + err.message)
    } finally {
      setAiChecking(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setError('Please connect your wallet first')
      return
    }
    
    if (!title || !abstract || !authors || !pdfFile) {
      setError('Please fill in all required fields')
      return
    }
    
    try {
      setLoading(true)
      setError(null)
      setUploadProgress(10)
      
      // Upload PDF to IPFS
      const pdfUrl = await uploadToIPFS(pdfFile)
      setUploadProgress(40)
      
      // Create metadata
      const metadata = {
        title,
        abstract,
        authors: authors.split(',').map(author => author.trim()),
        keywords: keywords.split(',').map(keyword => keyword.trim()),
        pdfUrl,
        timestamp: new Date().toISOString(),
        creator: account
      }
      
      // Upload metadata to IPFS
      const metadataUrl = await uploadJSONToIPFS(metadata)
      setUploadProgress(70)
      
      // Mint NFT
      const contract = getResearchNFTContract(library, account)
      const tx = await contract.mintResearchNFT(metadataUrl)
      await tx.wait()
      
      setUploadProgress(100)
      setSuccess(true)
      
    } catch (err) {
      setError('Error submitting research: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <h1 className="mb-4">Submit Research Paper</h1>
      
      {!isAuthenticated && (
        <Alert variant="warning">
          Please connect your wallet to submit research papers.
        </Alert>
      )}
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">
          Your research paper has been successfully submitted and minted as an NFT!
        </Alert>
      )}
      
      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Abstract</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={5}
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Authors (comma separated)</Form.Label>
              <Form.Control 
                type="text" 
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                disabled={loading}
                required
                placeholder="John Doe, Jane Smith"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Keywords (comma separated)</Form.Label>
              <Form.Control 
                type="text" 
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                disabled={loading}
                placeholder="blockchain, research, academic"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Citation Style</Form.Label>
              <Form.Select
                value={citationStyle}
                onChange={(e) => setCitationStyle(e.target.value)}
                disabled={loading}
              >
                <option value="APA">APA</option>
                <option value="MLA">MLA</option>
                <option value="Chicago">Chicago</option>
                <option value="IEEE">IEEE</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Upload PDF</Form.Label>
              <Form.Control 
                type="file" 
                accept=".pdf"
                onChange={handleFileChange}
                disabled={loading}
                required
              />
            </Form.Group>
            
            <div className="d-flex gap-2 mb-3">
              <Button 
                variant="secondary" 
                onClick={handleAICheck}
                disabled={loading || aiChecking || !abstract}
              >
                {aiChecking ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Checking...
                  </>
                ) : 'AI Check'}
              </Button>
              
              <Button 
                type="submit" 
                variant="primary"
                disabled={loading || !isAuthenticated}
              >
                {loading ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" className="me-2" />
                    Submitting...
                  </>
                ) : 'Submit Research'}
              </Button>
            </div>
            
            {loading && (
              <ProgressBar animated now={uploadProgress} className="mt-3" />
            )}
          </Form>
        </Card.Body>
      </Card>
      
      {aiResults && (
        <Card>
          <Card.Header>AI Check Results</Card.Header>
          <Card.Body>
            <h5>Plagiarism Check</h5>
            <p>Similarity Score: {aiResults.plagiarism.similarityScore}%</p>
            {aiResults.plagiarism.similarityScore > 30 && (
              <Alert variant="warning">
                High similarity detected. Please review your content for potential plagiarism.
              </Alert>
            )}
            
            <h5 className="mt-3">Citation Analysis</h5>
            {aiResults.citations.issues.length > 0 ? (
              <>
                <Alert variant="info">
                  {aiResults.citations.issues.length} citation issues found. Please review the suggestions below.
                </Alert>
                <ul>
                  {aiResults.citations.issues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </>
            ) : (
              <Alert variant="success">
                No citation issues found. Your citations appear to follow the {citationStyle} style correctly.
              </Alert>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default SubmitResearchPage