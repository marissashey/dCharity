import { useWallet, Wallet, WalletAccount, WalletId } from '@txnlab/use-wallet-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Account from './Account'

interface ConnectWalletInterface {
  openModal: boolean
  closeModal: () => void
}

const ConnectWallet = ({ openModal, closeModal }: ConnectWalletInterface) => {
  const { wallets, activeAddress, activeWalletAccounts } = useWallet()
  const [showAddressSelector, setShowAddressSelector] = useState(false)
  const navigate = useNavigate()

  const isKmd = (wallet: Wallet) => wallet.id === WalletId.KMD

  const handleAddressChange = async (account: WalletAccount) => {
    const activeWallet = wallets?.find((w) => w.isActive)
    if (activeWallet && account) {
      activeWallet.setActiveAccount(account.address)
      setShowAddressSelector(false)
    }
  }

  return (
    <dialog id="connect_wallet_modal" className={`modal ${openModal ? 'modal-open' : ''}`}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-2xl">Select wallet provider</h3>

        <div className="grid m-2 pt-5">
          {activeAddress && (
            <>
              <Account />

              {/* Address Selector Section */}
              {activeWalletAccounts && activeWalletAccounts.length > 1 && (
                <>
                  <button
                    className="btn btn-outline btn-primary m-2"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowAddressSelector(!showAddressSelector)
                    }}
                  >
                    {showAddressSelector ? 'Hide' : 'Set'} Active Address
                  </button>

                  {showAddressSelector && (
                    <div className="border rounded-lg p-4 m-2 bg-base-200">
                      <p className="text-sm font-semibold mb-2">Select an address:</p>
                      <div className="space-y-2">
                        {activeWalletAccounts.map((account) => (
                          <div
                            key={account.address}
                            className={`p-3 rounded cursor-pointer hover:bg-base-300 transition-colors ${
                              activeAddress === account.address ? 'bg-primary text-primary-content' : 'bg-base-100'
                            }`}
                            onClick={() => handleAddressChange(account)}
                          >
                            <div className="font-mono text-xs break-all">{account.address}</div>
                            {account.name && <div className="text-sm mt-1 opacity-70">{account.name}</div>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="divider" />
            </>
          )}

          {!activeAddress &&
            wallets?.map((wallet) => (
              <button
                data-test-id={`${wallet.id}-connect`}
                className="btn border-teal-800 border-1  m-2"
                key={`provider-${wallet.id}`}
                onClick={() => {
                  return wallet.connect()
                }}
              >
                {!isKmd(wallet) && (
                  <img
                    alt={`wallet_icon_${wallet.id}`}
                    src={wallet.metadata.icon}
                    style={{ objectFit: 'contain', width: '30px', height: 'auto' }}
                  />
                )}
                <span>{isKmd(wallet) ? 'LocalNet Wallet' : wallet.metadata.name}</span>
              </button>
            ))}
        </div>

        <div className="modal-action ">
          <button
            data-test-id="close-wallet-modal"
            className="btn"
            onClick={() => {
              closeModal()
              setShowAddressSelector(false)
            }}
          >
            Close
          </button>
          {activeAddress && (
            <button
              className="btn btn-warning"
              data-test-id="logout"
              onClick={async () => {
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
                navigate('/')
              }}
            >
              Logout
            </button>
          )}
        </div>
      </form>
    </dialog>
  )
}
export default ConnectWallet
