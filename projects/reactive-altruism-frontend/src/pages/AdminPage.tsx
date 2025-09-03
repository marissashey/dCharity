import React, { useState } from 'react'
import { CogIcon, PlusIcon, ClipboardDocumentListIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import CreateEventForm from '../components/CreateEventForm'
import EventsGrid from '../components/EventsGrid'
import RecentEventsList from '../components/RecentEventsList'

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<'create' | 'manage' | 'analytics'>('create')

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Administration</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Manage events and monitor platform activity
          </p>

          <div className="grid grid-cols-3 gap-6 mt-8 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Active Events</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$247K</div>
              <div className="text-sm text-gray-600">Total Pledged</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1,847</div>
              <div className="text-sm text-gray-600">Users</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveSection('create')}
                className={`flex items-center space-x-2 pb-3 border-b-2 font-medium transition-colors ${
                  activeSection === 'create'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <PlusIcon className="h-4 w-4" />
                <span>Create</span>
              </button>
              <button
                onClick={() => setActiveSection('manage')}
                className={`flex items-center space-x-2 pb-3 border-b-2 font-medium transition-colors ${
                  activeSection === 'manage'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <ClipboardDocumentListIcon className="h-4 w-4" />
                <span>Manage</span>
              </button>
              <button
                onClick={() => setActiveSection('analytics')}
                className={`flex items-center space-x-2 pb-3 border-b-2 font-medium transition-colors ${
                  activeSection === 'analytics'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <ChartBarIcon className="h-4 w-4" />
                <span>Analytics</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div>
          {activeSection === 'create' && (
            <div>
              <CreateEventForm />
            </div>
          )}

          {activeSection === 'manage' && (
            <div>
              <EventsGrid />
            </div>
          )}

          {activeSection === 'analytics' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Events</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Hurricane Relief</span>
                      <span className="font-medium">$45,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Education Fund</span>
                      <span className="font-medium">$32,100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Wildlife Conservation</span>
                      <span className="font-medium">$28,900</span>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <RecentEventsList />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
