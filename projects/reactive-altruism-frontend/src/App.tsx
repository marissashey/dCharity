import { SupportedWallet, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { SnackbarProvider } from 'notistack'
import { useState } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import LandingPage from './pages/LandingPage'
import Home from './Home'
import EventDetailPage from './pages/EventDetailPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { getAlgodConfigFromViteEnvironment, getKmdConfigFromViteEnvironment } from './utils/getAlgorandConfigs'
import { AppClientProvider } from './context/AppClientContext'

function AppContent() {
  const { activeAddress } = useWallet()
  
  if (!activeAddress) {
    return <LandingPage />
  }
  
  return <Home />
}

let supportedWallets: SupportedWallet[]

if (import.meta.env.VITE_ALGOD_NETWORK === 'localnet') {
  const kmdConfig = getKmdConfigFromViteEnvironment()
  supportedWallets = [
    { id: WalletId.LUTE },
    {
      id: WalletId.KMD,
      options: {
        baseServer: kmdConfig.server,
        token: String(kmdConfig.token),
        port: String(kmdConfig.port),
      },
    },
  ]
} else {
  supportedWallets = [
    { id: WalletId.DEFLY },
    { id: WalletId.PERA },
    { id: WalletId.EXODUS },
    // If you are interested in WalletConnect v2 provider
    // refer to https://github.com/TxnLab/use-wallet for detailed integration instructions
  ]
}

export default function App() {
  const algodConfig = getAlgodConfigFromViteEnvironment()

  const walletManager = new WalletManager({
    wallets: supportedWallets,
    defaultNetwork: algodConfig.network,
    networks: {
      [algodConfig.network]: {
        algod: {
          baseServer: algodConfig.server,
          port: algodConfig.port,
          token: String(algodConfig.token),
        },
      },
    },
    options: {
      resetNetwork: true,
    },
  })

  return (
    <SnackbarProvider maxSnack={3}>
      <WalletProvider manager={walletManager}>
        <AppClientProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppContent />} />
              <Route path="/event/:eventId" element={<EventDetailPage />} />
            </Routes>
          </BrowserRouter>
        </AppClientProvider>
      </WalletProvider>
    </SnackbarProvider>
  )
}
