import { useWallet } from '@txnlab/use-wallet-react'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function HeroSection() {
  const { activeAddress } = useWallet()

  return (
    <div className="max-w-6xl mx-auto px-8 py-16">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Responsive Donations
        </h1>
        
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          You want your donations to make maximal impact. Charities want to be well-funded when crises hit. Smart contracts enable smarter
          contributions: pre-authorize decentralized donations that auto-deploy based on real-world event conditions.
        </p>
      </div>

      {!activeAddress ? (
        <div className="bg-slate-50 rounded-lg p-8 mb-12">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Technical Architecture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800">Smart Contract Escrow</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Donations are held in Algorand smart contracts with ABI-compliant methods for conditional release. 
                Funds remain locked until oracle-verified conditions are met, ensuring donor intent is programmatically enforced.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800">Oracle Integration</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Decentralized oracle network validates real-world events through multi-source verification. 
                Each oracle maintains reputation scores and stake requirements to ensure data integrity.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-800">Conditional Logic</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Define trigger conditions using boolean operators, thresholds, and time windows. 
                Conditions are compiled to TEAL bytecode and executed atomically on-chain when criteria are satisfied.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-lg p-6 mb-12">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">Connected Wallet</p>
              <p className="text-slate-600 font-mono text-sm">
                {activeAddress.slice(0, 12)}...{activeAddress.slice(-12)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Technical Implementation Details */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-6">Implementation Details</h2>
        
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-2">Event Verification Protocol</h4>
            <p className="text-sm text-slate-600 mb-3">
              Multiple independent oracles fetch data from verified sources (APIs, news feeds, government databases). 
              Consensus mechanism requires 67% agreement before triggering contract execution.
            </p>
            <code className="text-xs bg-slate-100 p-2 rounded block font-mono text-slate-700">
              {`if (oracle_confirmations >= Math.ceil(total_oracles * 0.67)) execute_donation()`}
            </code>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-2">Atomic Transaction Groups</h4>
            <p className="text-sm text-slate-600 mb-3">
              Donations execute as atomic transaction groups ensuring all-or-nothing execution. 
              Includes payment transaction, application call, and state update in single atomic operation.
            </p>
            <code className="text-xs bg-slate-100 p-2 rounded block font-mono text-slate-700">
              AtomicTransactionComposer().addMethodCall().addPayment().execute()
            </code>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-2">State Management</h4>
            <p className="text-sm text-slate-600 mb-3">
              Global state stores campaign metadata, total donations, and trigger conditions. 
              Local state tracks individual donor contributions and claim status using 64-byte entries.
            </p>
            <code className="text-xs bg-slate-100 p-2 rounded block font-mono text-slate-700">
              global_state: {`{campaign_id, target_amount, trigger_condition, oracle_addresses}`}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}