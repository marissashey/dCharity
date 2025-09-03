import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import ConnectWallet from './components/ConnectWallet'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import DonationsPage from './pages/DonationsPage'
import AdminPage from './pages/AdminPage'
import OraclePage from './pages/OraclePage'

export default function Home() {
  const { activeAddress } = useWallet()
  const [currentPage, setCurrentPage] = useState<'donations' | 'admin' | 'oracle'>('donations')

  if (!activeAddress) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
        />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <HeroSection />
          <div className="flex justify-center mt-16">
            <ConnectWallet />
          </div>
        </div>
      </div>
    )
  }

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