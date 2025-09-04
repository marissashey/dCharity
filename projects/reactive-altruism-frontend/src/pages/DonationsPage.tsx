import React, { useState } from 'react'
import { GiftIcon, ClockIcon } from '@heroicons/react/24/outline'
import InstantDonationForm from '../components/InstantDonationForm'
import ConditionalDonationForm from '../components/ConditionalDonationForm'

export default function DonationsPage() {
  const [activeSection, setActiveSection] = useState<'instant' | 'conditional'>('instant')

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Make a Donation
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Choose between instant donations or conditional giving based on future events
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveSection('instant')}
                className={`flex items-center space-x-2 pb-3 border-b-2 font-medium transition-colors ${
                  activeSection === 'instant'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <GiftIcon className="h-4 w-4" />
                <span>Instant</span>
              </button>
              <button
                onClick={() => setActiveSection('conditional')}
                className={`flex items-center space-x-2 pb-3 border-b-2 font-medium transition-colors ${
                  activeSection === 'conditional'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <ClockIcon className="h-4 w-4" />
                <span>Conditional</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div>
          {activeSection === 'instant' && (
            <div>
              <InstantDonationForm />
            </div>
          )}

          {activeSection === 'conditional' && (
            <div>
              <ConditionalDonationForm />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
