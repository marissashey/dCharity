import { useWallet } from '@txnlab/use-wallet-react'
import { HeartIcon, ShieldCheckIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function HeroSection() {
  const { activeAddress } = useWallet()

  return (
    <div className="text-center max-w-6xl mx-auto px-8 py-16">
      <div className="mb-8">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center shadow-lg">
            <HeartIcon className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Responsive Donations
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          You want your donations to make maximal impact. Charities want to be well-funded when crises hit. Smart contracts enable smarter
          contributions: pre-authorize decentralized donations that auto-deploy based on real-world event conditions.
        </p>
      </div>

      {!activeAddress ? (
        <div className="bg-slate-50 rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-800">Instant Impact</h3>
              <p className="text-slate-600">
                Direct charitable contributions with immediate processing and transparent tracking
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-800">Conditional Giving</h3>
              <p className="text-slate-600">
                Donations that activate based on verified real-world events and outcomes
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-800">Verified Outcomes</h3>
              <p className="text-slate-600">
                Decentralized oracle network ensures accuracy of event data
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-lg p-6 mb-12">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <ShieldCheckIcon className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-lg font-semibold text-slate-800">Wallet Connected</p>
              <p className="text-slate-600 font-mono text-sm">
                {activeAddress.slice(0, 12)}...{activeAddress.slice(-12)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Use Cases */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Impact Areas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-slate-800 mb-2">Climate Action</h4>
            <p className="text-sm text-slate-600">Respond to environmental milestones</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-slate-800 mb-2">Medical Research</h4>
            <p className="text-sm text-slate-600">Support breakthrough research</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-slate-800 mb-2">Education</h4>
            <p className="text-sm text-slate-600">Fund academic programs</p>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-slate-800 mb-2">Humanitarian Aid</h4>
            <p className="text-sm text-slate-600">Provide crisis assistance</p>
          </div>
        </div>
      </div>
    </div>
  )
}