import React from 'react'
import { Link } from 'react-router-dom'
import ConnectWallet from './ConnectWallet'
import { useWallet } from '@txnlab/use-wallet-react'
import { WalletIcon, HeartIcon } from '@heroicons/react/24/outline'

interface NavbarProps {
  currentPage: 'donations' | 'admin' | 'oracle'
  onPageChange: (page: 'donations' | 'admin' | 'oracle') => void
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [openWalletModal, setOpenWalletModal] = React.useState(false)
  const toggleWalletModal = () => setOpenWalletModal((v) => !v)
  const { activeAddress } = useWallet()

  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 focus:outline-none">
          <div className="w-8 h-8 bg-gray-900 flex items-center justify-center">
            <HeartIcon className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Responsive Donations</h1>
        </Link>

        {/* Navigation */}
        {activeAddress && (
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onPageChange('donations')}
              className={currentPage === 'donations' ? 'nav-link-active border-b-2 border-gray-900 pb-1' : 'nav-link'}
            >
              Donations
            </button>
            <button
              onClick={() => onPageChange('admin')}
              className={currentPage === 'admin' ? 'nav-link-active border-b-2 border-gray-900 pb-1' : 'nav-link'}
            >
              Admin
            </button>
            <button
              onClick={() => onPageChange('oracle')}
              className={currentPage === 'oracle' ? 'nav-link-active border-b-2 border-gray-900 pb-1' : 'nav-link'}
            >
              Oracle
            </button>
          </div>
        )}

        {/* Wallet Connection */}
        <div className="flex items-center space-x-4">
          {activeAddress && (
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 bg-green-500"></span>
              <span className="font-mono">
                {activeAddress.slice(0, 6)}...{activeAddress.slice(-4)}
              </span>
            </div>
          )}
          <button
            className="btn-primary flex items-center gap-2"
            onClick={toggleWalletModal}
            data-test-id="connect-wallet-navbar"
          >
            <WalletIcon className="h-4 w-4" />
            {activeAddress ? 'Wallet' : 'Connect'}
          </button>
        </div>

        <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
      </div>

      {/* Mobile Navigation */}
      {activeAddress && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-3">
          <div className="flex space-x-6">
            <button
              onClick={() => onPageChange('donations')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'donations'
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Donations
            </button>
            <button
              onClick={() => onPageChange('admin')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'admin'
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => onPageChange('oracle')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'oracle'
                  ? 'text-gray-900 border-b-2 border-gray-900 pb-1'
                  : 'text-gray-600 hover:text-gray-900'
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
