import { useState } from 'react'
import Navbar from './components/Navbar'
import DonationsPage from './pages/DonationsPage'
import AnalyticsPage from './pages/AnalyticsPage'
import OraclePage from './pages/OraclePage'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'donations' | 'analytics' | 'oracle'>('donations')

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
      />
      
      {currentPage === 'donations' && <DonationsPage />}
      {currentPage === 'analytics' && <AnalyticsPage />}
      {currentPage === 'oracle' && <OraclePage />}
    </div>
  )
}