import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>DecentraResearch</h5>
            <p>A decentralized AI-powered research platform ensuring academic integrity through blockchain technology.</p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light">About Us</a></li>
              <li><a href="#" className="text-light">How It Works</a></li>
              <li><a href="#" className="text-light">FAQ</a></li>
              <li><a href="#" className="text-light">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Connect With Us</h5>
            <p>Join our community to stay updated on the latest developments.</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light"><i className="bi bi-github"></i></a>
              <a href="#" className="text-light"><i className="bi bi-discord"></i></a>
            </div>
          </Col>
        </Row>
        <hr className="my-3 bg-secondary" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} DecentraResearch. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer