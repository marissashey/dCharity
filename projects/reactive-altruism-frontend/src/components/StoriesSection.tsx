import { useState } from 'react'
import { 
  HeartIcon, 
  UserGroupIcon, 
  MapPinIcon, 
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'

export default function StoriesSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All causes', count: 847 },
    { id: 'emergency', name: 'Emergency relief', count: 123 },
    { id: 'education', name: 'Education', count: 234 },
    { id: 'health', name: 'Medical & health', count: 156 },
    { id: 'environment', name: 'Environment', count: 89 },
    { id: 'community', name: 'Community', count: 245 }
  ]

  const stories = [
    {
      id: 1,
      category: 'emergency',
      title: "Wildfire Relief Fund for Northern California",
      creator: "Lisa Martinez",
      creatorImage: "/api/placeholder/48/48",
      location: "Napa County, CA",
      image: "/api/placeholder/300/200",
      raised: 34500,
      goal: 75000,
      supporters: 456,
      daysLeft: 28,
      condition: "WHEN CAL FIRE declares Level 3 evacuation",
      status: "monitoring",
      urgency: "high",
      story: "Last year's fires destroyed 12 homes in our neighborhood. This fund will deploy immediately when CAL FIRE issues evacuation orders, providing emergency supplies and temporary housing for displaced families.",
      updates: 3,
      rating: 4.9,
      verified: true,
      tags: ["Verified by CAL FIRE", "Emergency Response"]
    },
    {
      id: 2,
      category: 'education',
      title: "STEM Scholarships for Underrepresented Students",
      creator: "Dr. James Kim & Coalition",
      creatorImage: "/api/placeholder/48/48",
      location: "Detroit, MI",
      image: "/api/placeholder/300/200",
      raised: 89200,
      goal: 120000,
      supporters: 234,
      daysLeft: 45,
      condition: "WHEN students complete summer program with 85%+ attendance",
      status: "active",
      urgency: "medium",
      story: "We're changing lives through education. When students complete our intensive summer STEM program with 85% attendance (verified through our partner schools), scholarships automatically unlock for their college tuition.",
      updates: 7,
      rating: 5.0,
      verified: true,
      tags: ["University Verified", "Long-term Impact"]
    },
    {
      id: 3,
      category: 'health',
      title: "Mobile Health Clinic for Rural Communities",
      creator: "Maria Santos, RN",
      creatorImage: "/api/placeholder/48/48",
      location: "Rural Texas",
      image: "/api/placeholder/300/200",
      raised: 156750,
      goal: 200000,
      supporters: 892,
      daysLeft: 12,
      condition: "WHEN clinic reaches 500 patient visits/month",
      status: "nearly_funded",
      urgency: "low",
      story: "Our mobile clinic serves 15 rural towns with no hospital access. When we consistently reach 500+ patient visits monthly (verified through health records), we'll expand with a second clinic and specialized equipment.",
      updates: 12,
      rating: 4.8,
      verified: true,
      tags: ["Medical Partner Verified", "Healthcare Access"]
    },
    {
      id: 4,
      category: 'environment',
      title: "Coral Reef Restoration Project",
      creator: "Ocean Conservation Alliance",
      creatorImage: "/api/placeholder/48/48",
      location: "Florida Keys",
      image: "/api/placeholder/300/200",
      raised: 67800,
      goal: 150000,
      supporters: 345,
      daysLeft: 60,
      condition: "WHEN water temperature drops below 84°F for 30 days",
      status: "monitoring",
      urgency: "medium",
      story: "Climate change is killing our reefs. This fund deploys when ocean temperatures drop to safe levels for coral transplantation, automatically funding our restoration efforts when conditions are optimal.",
      updates: 5,
      rating: 4.7,
      verified: true,
      tags: ["NOAA Verified", "Climate Action"]
    }
  ]

  const getStatusBadge = (status: string, urgency: string) => {
    if (status === 'active') return 'bg-green-100 text-green-800 border-green-200'
    if (status === 'monitoring') return 'bg-blue-100 text-blue-800 border-blue-200'
    if (status === 'nearly_funded') return 'bg-purple-100 text-purple-800 border-purple-200'
    return 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getProgressPercentage = (raised: number, goal: number) => {
    return Math.min((raised / goal) * 100, 100)
  }

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const filteredStories = activeCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === activeCategory)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Real people. Real impact. <span className="text-green-600">Real results.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every campaign is backed by verified conditions and transparent tracking. 
            See exactly how your donation creates change.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredStories.map((story) => (
            <article 
              key={story.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Story Image */}
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Status Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(story.status, story.urgency)}`}>
                  {story.status === 'active' && 'READY TO DEPLOY'}
                  {story.status === 'monitoring' && 'MONITORING CONDITIONS'}
                  {story.status === 'nearly_funded' && 'ALMOST FUNDED!'}
                </div>

                {/* Verification Badge */}
                {story.verified && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-1">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Creator Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-gray-900 truncate">{story.creator}</p>
                      {story.verified && (
                        <CheckCircleIcon className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{story.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid 
                        key={i} 
                        className={`h-3 w-3 ${i < Math.floor(story.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">{story.rating}</span>
                  </div>
                </div>

                {/* Title and Story */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {story.story}
                </p>

                {/* Condition Box */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <ClockIcon className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-900 uppercase tracking-wide">Auto-deploy condition</span>
                  </div>
                  <p className="text-sm text-blue-800 font-medium">{story.condition}</p>
                </div>

                {/* Progress */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold text-gray-900">{formatMoney(story.raised)}</span>
                    <span className="text-sm text-gray-500">of {formatMoney(story.goal)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${getProgressPercentage(story.raised, story.goal)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <UserGroupIcon className="h-4 w-4" />
                        <span>{story.supporters.toLocaleString()} supporters</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{story.daysLeft} days left</span>
                      </div>
                    </div>
                    <span>{story.updates} updates</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {story.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2">
                  <span>Support this cause</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Show more campaigns
          </button>
        </div>
      </div>
    </section>
  )
}