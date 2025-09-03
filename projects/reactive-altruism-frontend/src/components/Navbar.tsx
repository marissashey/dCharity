import React from 'react'
import ConnectWalletModal from './ConnectWalletModal'
import { useWallet } from '@txnlab/use-wallet-react'
import { WalletIcon, HeartIcon } from '@heroicons/react/24/outline'

interface NavbarProps {
  currentPage: 'donations' | 'admin' | 'oracle'
  onPageChange: (page: 'donations' | 'admin' | 'oracle') => void
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [openWalletModal, setOpenWalletModal] = React.useState(false)
  const toggleWalletModal = () => setOpenWalletModal((v) => !v)
  const { activeAddress, wallets } = useWallet()

  const handleDisconnect = async () => {
    try {
      if (wallets) {
        const activeWallet = wallets.find((w) => w.isActive)
        if (activeWallet) {
          await activeWallet.disconnect()
        } else {
          localStorage.removeItem('@txnlab/use-wallet:v3')
          window.location.reload()
        }
      }
    } catch (error) {
      console.error('Disconnect error:', error)
      // Fallback to localStorage clear and reload
      localStorage.removeItem('@txnlab/use-wallet:v3')
      window.location.reload()
    }
  }

  return (
    <nav className="w-full border-b border-gray-100 bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo - now clickable to go back to landing */}
        <div 
          className="flex items-center space-x-3 group cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleDisconnect}
          title="Back to landing page"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
            <HeartIcon className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-gray-900 bg-clip-text text-transparent">
            Responsive Donations
          </h1>
        </div>

        {/* Navigation */}
        {activeAddress && (
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => onPageChange('donations')}
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 'donations' 
                  ? 'bg-slate-100 text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Donations
              {currentPage === 'donations' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-slate-900 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => onPageChange('admin')}
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 'admin' 
                  ? 'bg-slate-100 text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Admin
              {currentPage === 'admin' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-slate-900 rounded-full"></div>
              )}
            </button>
            <button
              onClick={() => onPageChange('oracle')}
              className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 'oracle' 
                  ? 'bg-slate-100 text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Oracle
              {currentPage === 'oracle' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-slate-900 rounded-full"></div>
              )}
            </button>
          </div>
        )}

        {/* Wallet Connection */}
        <div className="flex items-center space-x-4">
          {activeAddress && (
            <div className="hidden sm:flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="font-mono text-sm text-slate-600">
                {activeAddress.slice(0, 6)}...{activeAddress.slice(-4)}
              </span>
            </div>
          )}
          <button 
            className="btn-primary flex items-center gap-2 relative group overflow-hidden" 
            onClick={toggleWalletModal} 
            data-test-id="connect-wallet-navbar"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <WalletIcon className="h-4 w-4 relative z-10" />
            <span className="relative z-10">{activeAddress ? 'Wallet' : 'Connect'}</span>
          </button>
          {activeAddress && (
            <button 
              className="text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors duration-200 px-3 py-2 hover:bg-slate-50 rounded-lg"
              onClick={handleDisconnect}
              title="Disconnect and return to landing page"
            >
              Disconnect
            </button>
          )}
        </div>
        
        <ConnectWalletModal isOpen={openWalletModal} onClose={toggleWalletModal} />
      </div>

      {/* Mobile Navigation */}
      {activeAddress && (
        <div className="md:hidden border-t border-gray-100 bg-white/80 backdrop-blur-sm px-6 py-3">
          <div className="flex space-x-1">
            <button
              onClick={() => onPageChange('donations')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 'donations' 
                  ? 'bg-slate-100 text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Donations
            </button>
            <button
              onClick={() => onPageChange('admin')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 'admin' 
                  ? 'bg-slate-100 text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => onPageChange('oracle')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === 'oracle' 
                  ? 'bg-slate-100 text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Oracle
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
