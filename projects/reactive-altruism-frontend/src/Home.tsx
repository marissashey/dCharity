import { useState } from 'react'
import Navbar from './components/Navbar'
import DonationsPage from './pages/DonationsPage'
import AdminPage from './pages/AdminPage'
import OraclePage from './pages/OraclePage'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'donations' | 'admin' | 'oracle'>('donations')

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
      />
      
      {currentPage === 'donations' && <DonationsPage />}
      {currentPage === 'admin' && <AdminPage />}
      {currentPage === 'oracle' && <OraclePage />}
    </div>
  )
}