import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import WalletConnector from '../blockchain/WalletConnector'

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">DecentraResearch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/marketplace">Marketplace</Nav.Link>
            <Nav.Link as={Link} to="/submit">Submit Research</Nav.Link>
            <Nav.Link as={Link} to="/verify">Verify & Review</Nav.Link>
            <Nav.Link as={Link} to="/dao">DAO Governance</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/profile" className="me-3">My Profile</Nav.Link>
            <WalletConnector />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header