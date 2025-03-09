import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import SubmitResearchPage from './pages/SubmitResearchPage'
import MarketplacePage from './pages/MarketplacePage'
import VerifyPage from './pages/VerifyPage'
import DAOPage from './pages/DAOPage'
import ResearchDetailPage from './pages/ResearchDetailPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitResearchPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/dao" element={<DAOPage />} />
          <Route path="/research/:id" element={<ResearchDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App