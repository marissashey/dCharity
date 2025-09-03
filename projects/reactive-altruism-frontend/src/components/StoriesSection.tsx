export default function StoriesSection() {
  return (
    <div className="py-16">
      <h2 className="text-2xl font-bold text-slate-800 mb-8">Use Case Examples</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-800 mb-3">Disaster Response Protocol</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p><strong>Trigger:</strong> USGS earthquake magnitude {`>=`} 7.0 within specified geographic region</p>
            <p><strong>Oracle Sources:</strong> USGS API, EMSC-CSEM, local seismic networks</p>
            <p><strong>Release Mechanism:</strong> Funds auto-transfer to pre-verified relief organizations within 15 minutes of consensus</p>
            <p><strong>Verification:</strong> 3 of 5 oracles must confirm event parameters match conditions</p>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-800 mb-3">Pandemic Preparedness Fund</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p><strong>Trigger:</strong> WHO declares Public Health Emergency of International Concern</p>
            <p><strong>Oracle Sources:</strong> WHO API, CDC data feeds, health ministry bulletins</p>
            <p><strong>Release Mechanism:</strong> Graduated release based on severity level (1-5 scale)</p>
            <p><strong>Verification:</strong> Multi-signature validation from healthcare oracle consortium</p>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-800 mb-3">Climate Milestone Funding</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p><strong>Trigger:</strong> Regional temperature anomaly exceeds +2°C baseline for 30 consecutive days</p>
            <p><strong>Oracle Sources:</strong> NOAA, NASA GISS, ERA5 reanalysis data</p>
            <p><strong>Release Mechanism:</strong> Proportional distribution to adaptation projects based on impact scores</p>
            <p><strong>Verification:</strong> Statistical analysis of aggregated temperature data across sources</p>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h3 className="font-semibold text-slate-800 mb-3">Refugee Crisis Response</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p><strong>Trigger:</strong> UNHCR reports displacement exceeding 100,000 in 7-day period</p>
            <p><strong>Oracle Sources:</strong> UNHCR API, IOM displacement tracking, satellite imagery analysis</p>
            <p><strong>Release Mechanism:</strong> Immediate release to pre-approved aid organizations in affected regions</p>
            <p><strong>Verification:</strong> Cross-validation with ground reports and satellite data</p>
          </div>
        </div>
      </div>
    </div>
  )
}