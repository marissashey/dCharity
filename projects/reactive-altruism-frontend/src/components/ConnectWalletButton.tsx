import { useWallet } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import { WalletIcon } from '@heroicons/react/24/outline'
import ConnectWalletModal from './ConnectWalletModal'

export default function ConnectWalletButton() {
  const { activeAddress } = useWallet()
  const [showModal, setShowModal] = useState(false)

  if (activeAddress) {
    return null // Don't show button if already connected
  }

  return (
    <div className="relative group">
      {/* Main Connect Button */}
      <button
        onClick={() => setShowModal(true)}
        className="relative px-8 py-4 bg-gradient-to-r from-slate-800 via-gray-900 to-slate-700 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 flex items-center space-x-3"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10 flex items-center space-x-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <WalletIcon className="h-6 w-6 text-white" />
          </div>
          <div className="text-left">
            <div className="text-lg font-bold">Connect Wallet</div>
            <div className="text-sm opacity-80">Start your philanthropic journey</div>
          </div>
        </div>
        
        {/* Animated shine effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </button>
      
      {/* Pulse ring effect */}
      <div className="absolute inset-0 rounded-2xl bg-slate-700/20 animate-pulse"></div>
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      

      {/* Connect Wallet Modal */}
      <ConnectWalletModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  )
}