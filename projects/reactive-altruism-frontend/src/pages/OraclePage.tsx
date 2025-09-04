import React, { useState } from 'react'
import { CpuChipIcon, PlusIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import CreateEventForm from '../components/CreateEventForm'
import EventsGrid from '../components/EventsGrid'

export default function OraclePage() {
  const [activeTab, setActiveTab] = useState<'events' | 'create'>('events')

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Oracle & Events</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Browse and create events for conditional donations
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center space-x-2 px-6 py-2 text-sm font-medium transition-colors rounded-md ${
                activeTab === 'events'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ClipboardDocumentListIcon className="h-4 w-4" />
              <span>Browse Events</span>
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex items-center space-x-2 px-6 py-2 text-sm font-medium transition-colors rounded-md ${
                activeTab === 'create'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <PlusIcon className="h-4 w-4" />
              <span>Create Event</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'events' && (
          <EventsGrid />
        )}
        
        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto">
            <CreateEventForm />
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 card p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <CpuChipIcon className="h-8 w-8 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Events are created with designated oracles who are responsible for resolving whether 
              the event occurred. Once resolved, conditional donations linked to that event can be executed.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Examples</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Natural disaster monitoring</li>
              <li>• Sports event outcomes</li>
              <li>• Legislative tracking</li>
              <li>• Economic milestones</li>
              <li>• Fundraising goals</li>
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Oracle Responsibilities</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Monitor assigned events</li>
              <li>• Provide accurate resolutions</li>
              <li>• Maintain transparency</li>
              <li>• Enable donation execution</li>
              <li>• Build community trust</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
