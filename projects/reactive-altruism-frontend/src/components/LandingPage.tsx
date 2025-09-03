import { useWallet } from '@txnlab/use-wallet-react'
import { useState, useEffect } from 'react'
import { 
  ArrowRightIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  HeartIcon,
  CloudIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BoltIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'
import ConnectWalletButton from './ConnectWalletButton'
import ImpactSection from './ImpactSection'

export default function LandingPage() {
  const { activeAddress } = useWallet()
  const [activeSection, setActiveSection] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveSection(prev => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const concepts = [
    {
      title: "Smart Triggers",
      description: "AI-powered conditions automatically deploy donations when real-world events occur",
      metric: "847 active triggers",
      icon: <BoltIcon className="h-6 w-6" />,
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Verified Impact", 
      description: "Blockchain verification ensures every donation reaches its intended destination",
      metric: "99.7% success rate",
      icon: <CheckCircleIcon className="h-6 w-6" />,
      color: "green",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Global Network",
      description: "Real-time monitoring from weather systems, academic records, and health data",
      metric: "127 data sources",
      icon: <GlobeAltIcon className="h-6 w-6" />,
      color: "purple",
      gradient: "from-purple-500 to-violet-500"
    }
  ]

  const examples = [
    {
      title: "Hurricane Relief → Florida",
      condition: "Category 3+ storm detection",
      status: "Monitoring",
      amount: "$47,200",
      impact: "12,000 families protected",
      icon: <CloudIcon className="h-5 w-5" />,
      urgency: "high"
    },
    {
      title: "Education Fund → Detroit",
      condition: "85%+ graduation rates", 
      status: "Deploying",
      amount: "$23,500",
      impact: "450 scholarships awarded",
      icon: <LightBulbIcon className="h-5 w-5" />,
      urgency: "active"
    },
    {
      title: "Water Access → Uganda",
      condition: "Population milestone reached",
      status: "Pending",
      amount: "$61,800",
      impact: "8 villages served",
      icon: <ShieldCheckIcon className="h-5 w-5" />,
      urgency: "low"
    }
  ]

  const stats = [
    { value: "$2.1M", label: "Ready to deploy", change: "+12%" },
    { value: "847", label: "Active conditions", change: "+5%" },
    { value: "127", label: "Data sources", change: "+8%" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-100/30 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-100/30 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s', animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <HeartIcon className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Responsive Donations
                </h1>
                <div className="text-xs text-gray-500 font-medium">Beta</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">How It Works</a>
              <a href="#examples" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Examples</a>
              <a href="#impact" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">Impact</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">About</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
                  <SparklesIcon className="h-4 w-4 text-blue-600" />
                  <span>AI-powered charitable giving</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900 mb-6">
                  Donations that
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 animate-pulse">
                    respond automatically
                  </span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-8">
                  Revolutionary smart contracts deploy charitable funds instantly when real-world conditions are verified. 
                  Hurricane relief triggered by weather data. Scholarships unlocked by graduation rates. 
                  <span className="font-medium text-gray-800"> Impact verified by AI.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  {!activeAddress && <ConnectWalletButton />}
                  <button className="group flex items-center space-x-3 border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                    <span>Explore Platform</span>
                    <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-500 mb-1">{stat.label}</div>
                      <div className="text-xs text-green-600 font-medium">{stat.change} this month</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Concepts */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                The Future of Giving
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Three breakthrough technologies working together to create the most efficient charitable platform ever built
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {concepts.map((concept, index) => (
                <div 
                  key={index}
                  className={`group relative p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer ${
                    activeSection === index 
                      ? 'border-transparent bg-gradient-to-br from-white to-gray-50 shadow-2xl scale-105' 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
                  }`}
                  onClick={() => setActiveSection(index)}
                >
                  {/* Gradient border effect */}
                  {activeSection === index && (
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${concept.gradient} p-0.5 opacity-60`}>
                      <div className="bg-white rounded-3xl h-full w-full" />
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center p-4 rounded-2xl mb-6 transition-all duration-300 ${
                      activeSection === index 
                        ? `bg-gradient-to-r ${concept.gradient} text-white shadow-lg` 
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                    }`}>
                      {concept.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{concept.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{concept.description}</p>
                    <div className="text-sm font-bold text-gray-800 bg-gray-100 px-3 py-2 rounded-lg inline-block">
                      {concept.metric}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Examples */}
        <section id="examples" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Active Deployments
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real campaigns using responsive donation contracts, creating measurable impact across the globe
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {examples.map((example, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden">
                  {/* Status indicator */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${
                    example.urgency === 'high' ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                    example.urgency === 'active' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    'bg-gradient-to-r from-gray-300 to-gray-400'
                  }`} />

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        example.urgency === 'high' ? 'bg-red-100 text-red-600' :
                        example.urgency === 'active' ? 'bg-green-100 text-green-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {example.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{example.title}</h3>
                        <p className="text-sm text-gray-600">{example.condition}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        example.status === 'Deploying' ? 'bg-green-100 text-green-800' :
                        example.status === 'Monitoring' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {example.status}
                      </span>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">{example.amount}</div>
                        <div className="text-xs text-gray-500">allocated</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Projected Impact:</span>
                        <span className="font-semibold text-gray-900">{example.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Intelligent Giving Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI-powered system ensures your donations create maximum impact through verified, automatic deployment
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <ClockIcon className="h-10 w-10 text-white" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Set Smart Conditions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Define specific, measurable triggers using our AI interface. Hurricane categories, 
                  graduation rates, health metrics—any verifiable real-world data becomes a condition.
                </p>
              </div>

              <div className="text-center group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <ShieldCheckIcon className="h-10 w-10 text-white" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">2. AI Verification</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our neural networks continuously monitor trusted data sources, cross-referencing 
                  multiple providers to ensure 99.7% accuracy in condition verification.
                </p>
              </div>

              <div className="text-center group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <BoltIcon className="h-10 w-10 text-white" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Instant Deployment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Smart contracts execute automatically when conditions are met. Funds transfer 
                  instantly to verified recipients with complete transparency and blockchain security.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <div id="impact">
          <ImpactSection />
        </div>
      </main>

      {/* Enhanced animations and styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gentle-rain {
            0% {
              transform: translateY(-20px);
              opacity: 0;
            }
            10% {
              opacity: 0.4;
            }
            90% {
              opacity: 0.4;
            }
            100% {
              transform: translateY(80px);
              opacity: 0;
            }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `
      }} />
    </div>
  )
}