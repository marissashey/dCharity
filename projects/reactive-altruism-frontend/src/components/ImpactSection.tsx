export default function ImpactSection() {
  return (
    <div className="py-16 border-t border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">System Components</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Oracle Network Architecture</h3>
          <div className="bg-slate-50 rounded-lg p-6">
            <pre className="text-xs font-mono text-slate-700 overflow-x-auto">
{`┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Data Source │────▶│   Oracle    │────▶│Smart Contract│
│   (API)     │     │    Node     │     │  Validation  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
  [External Data]    [Reputation]         [Consensus]
  - Government APIs   - Stake: 1000 ALGO    - 67% threshold
  - News feeds        - Accuracy: 99.2%      - Time window: 5min
  - Sensor networks   - Uptime: 99.9%        - Dispute period: 1hr`}
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Smart Contract Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded p-4">
              <code className="text-sm font-mono text-slate-800">create_campaign()</code>
              <p className="text-xs text-slate-600 mt-2">
                Initializes new donation campaign with trigger conditions, oracle addresses, and recipient wallet. 
                Sets global state variables and establishes escrow account.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded p-4">
              <code className="text-sm font-mono text-slate-800">donate(amount)</code>
              <p className="text-xs text-slate-600 mt-2">
                Accepts ALGO/ASA donations, updates campaign balance, records donor address in local state. 
                Emits donation event for off-chain indexing.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded p-4">
              <code className="text-sm font-mono text-slate-800">verify_condition()</code>
              <p className="text-xs text-slate-600 mt-2">
                Oracle-only method to submit event verification. Checks caller authorization, 
                validates data signature, updates confirmation count.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded p-4">
              <code className="text-sm font-mono text-slate-800">execute_release()</code>
              <p className="text-xs text-slate-600 mt-2">
                Triggers fund release after consensus achieved. Validates threshold met, 
                transfers funds atomically, updates campaign status.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Security Considerations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded p-4">
              <h4 className="font-semibold text-slate-800 text-sm mb-2">Sybil Resistance</h4>
              <p className="text-xs text-slate-600">
                Oracle nodes require minimum stake of 1000 ALGO. Slashing mechanism penalizes false reporting. 
                Reputation scores weight oracle influence in consensus.
              </p>
            </div>
            <div className="bg-slate-50 rounded p-4">
              <h4 className="font-semibold text-slate-800 text-sm mb-2">Time-lock Protection</h4>
              <p className="text-xs text-slate-600">
                Dispute period allows donors to challenge oracle decisions. 
                Funds remain locked for 1 hour post-consensus before release.
              </p>
            </div>
            <div className="bg-slate-50 rounded p-4">
              <h4 className="font-semibold text-slate-800 text-sm mb-2">Fail-safe Mechanisms</h4>
              <p className="text-xs text-slate-600">
                Emergency pause function for critical vulnerabilities. 
                Refund mechanism if conditions not met within expiry period.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Performance Metrics</h3>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Transaction Cost</p>
                <p className="font-mono font-semibold">~0.002 ALGO</p>
              </div>
              <div>
                <p className="text-slate-600">Verification Time</p>
                <p className="font-mono font-semibold">&lt; 5 minutes</p>
              </div>
              <div>
                <p className="text-slate-600">Oracle Accuracy</p>
                <p className="font-mono font-semibold">99.2%</p>
              </div>
              <div>
                <p className="text-slate-600">Network Uptime</p>
                <p className="font-mono font-semibold">99.9%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}