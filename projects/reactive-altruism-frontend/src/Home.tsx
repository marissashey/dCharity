import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import ConnectWalletButton from './components/ConnectWalletButton'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import DonationsPage from './pages/DonationsPage'
import AdminPage from './pages/AdminPage'
import OraclePage from './pages/OraclePage'

export default function Home() {
  const { activeAddress } = useWallet()
  const [currentPage, setCurrentPage] = useState<'donations' | 'admin' | 'oracle'>('donations')

  if (!activeAddress) {
    return <LandingPage />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
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