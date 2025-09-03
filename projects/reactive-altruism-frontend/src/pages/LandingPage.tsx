import { useState } from 'react'
import HeroSection from '../components/HeroSection'
import StoriesSection from '../components/StoriesSection'
import ImpactSection from '../components/ImpactSection'
import ConnectWallet from '../components/ConnectWallet'
import Navbar from '../components/Navbar'
import { useWallet } from '@txnlab/use-wallet-react'

export default function LandingPage() {
  const { activeAddress } = useWallet()
  const [currentPage, setCurrentPage] = useState<'donations' | 'admin' | 'oracle'>('donations')

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
      />
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        <HeroSection />
        
        {!activeAddress && (
          <div className="flex justify-center mt-16 mb-20">
            <ConnectWallet />
          </div>
        )}
        
        <StoriesSection />
        <ImpactSection />
      </div>
    </div>
  )
}