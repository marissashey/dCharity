import { useWallet, Wallet, WalletAccount, WalletId } from '@txnlab/use-wallet-react'
import { useState, useEffect } from 'react'
import { XMarkIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const { wallets, activeAddress, activeWalletAccounts } = useWallet()
  const [showAddressSelector, setShowAddressSelector] = useState(false)
  const [connecting, setConnecting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setError(null)
      setConnecting(null)
      setShowAddressSelector(false)
    }
  }, [isOpen])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const isKmd = (wallet: Wallet) => wallet.id === WalletId.KMD

  const handleConnect = async (wallet: Wallet) => {
    try {
      setConnecting(wallet.id)
      setError(null)
      await wallet.connect()
      // Success - modal will close automatically when activeAddress updates
    } catch (err) {
      setError(`Failed to connect to ${wallet.metadata.name}. Please try again.`)
      console.error('Wallet connection error:', err)
    } finally {
      setConnecting(null)
    }
  }

  const handleAddressChange = async (account: WalletAccount) => {
    try {
      const activeWallet = wallets?.find((w) => w.isActive)
      if (activeWallet && account) {
        await activeWallet.setActiveAccount(account.address)
        setShowAddressSelector(false)
      }
    } catch (err) {
      setError('Failed to change address. Please try again.')
      console.error('Address change error:', err)
    }
  }

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
      setShowAddressSelector(false)
      onClose()
    } catch (err) {
      setError('Failed to disconnect wallet.')
      console.error('Disconnect error:', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform rounded-2xl bg-white p-6 shadow-2xl transition-all">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {activeAddress ? 'Wallet Connected' : 'Connect Wallet'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Connected State */}
          {activeAddress && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-green-900">Connected</p>
                  <p className="text-xs font-mono text-green-700 truncate">
                    {activeAddress.slice(0, 8)}...{activeAddress.slice(-6)}
                  </p>
                </div>
              </div>

              {/* Address Selector */}
              {activeWalletAccounts && activeWalletAccounts.length > 1 && (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowAddressSelector(!showAddressSelector)}
                    className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Switch Address ({activeWalletAccounts.length} available)
                      </span>
                      <span className="text-gray-400">
                        {showAddressSelector ? '▲' : '▼'}
                      </span>
                    </div>
                  </button>

                  {showAddressSelector && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {activeWalletAccounts.map((account) => (
                        <div
                          key={account.address}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            activeAddress === account.address 
                              ? 'bg-blue-50 border-2 border-blue-200' 
                              : 'bg-gray-50 hover:bg-gray-100 border border-transparent'
                          }`}
                          onClick={() => handleAddressChange(account)}
                        >
                          <div className="font-mono text-xs text-gray-600 break-all">
                            {account.address}
                          </div>
                          {account.name && (
                            <div className="text-sm mt-1 text-gray-500">{account.name}</div>
                          )}
                          {activeAddress === account.address && (
                            <div className="text-xs text-blue-600 mt-1 font-medium">
                              ✓ Active
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Disconnect Button */}
              <button
                onClick={handleDisconnect}
                className="w-full p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors font-medium"
              >
                Disconnect Wallet
              </button>
            </div>
          )}

          {/* Wallet Selection */}
          {!activeAddress && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-4">
                Choose a wallet provider to connect to the Algorand network:
              </p>
              
              {wallets?.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleConnect(wallet)}
                  disabled={connecting === wallet.id}
                  className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {!isKmd(wallet) && (
                    <img
                      src={wallet.metadata.icon}
                      alt={`${wallet.metadata.name} icon`}
                      className="w-8 h-8 rounded-lg"
                      style={{ objectFit: 'contain' }}
                    />
                  )}
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-900 group-hover:text-gray-700">
                      {isKmd(wallet) ? 'LocalNet Wallet' : wallet.metadata.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {isKmd(wallet) ? 'For local development' : 'Algorand wallet provider'}
                    </div>
                  </div>
                  {connecting === wallet.id && (
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  )}
                </button>
              ))}
              
              {(!wallets || wallets.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No wallet providers available.</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Please install a compatible Algorand wallet.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Close Button */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="w-full p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}