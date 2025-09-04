import React, { useState } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import { useSnackbar } from 'notistack'
import { useAppClient } from '../context/AppClientContext'
import { useConditionalDonation } from '../hooks/useConditionalDonation'
import { useEvents } from '../hooks/useEvents'
import { ellipseAddress } from '../utils/ellipseAddress'

export default function ConditionalDonationForm() {
  const { activeAddress } = useWallet()
  const { enqueueSnackbar } = useSnackbar()
  const { appClient } = useAppClient()
  const { createConditionalDonation, loading: donationLoading, error, success } = useConditionalDonation(appClient, activeAddress)
  const { events, fetchEvents, loading: eventsLoading } = useEvents(appClient, activeAddress)
  
  const [eventId, setEventId] = useState('')
  const [recipientYes, setRecipientYes] = useState('')
  const [recipientNo, setRecipientNo] = useState('')
  const [donationAmount, setDonationAmount] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Auto-fill recipientNo with user's address when component mounts or activeAddress changes
  React.useEffect(() => {
    if (activeAddress && !recipientNo) {
      setRecipientNo(activeAddress)
    }
  }, [activeAddress, recipientNo])

  // Fetch events when component mounts or appClient changes
  React.useEffect(() => {
    if (appClient) {
      fetchEvents()
    }
  }, [appClient, fetchEvents])

  // Filter to get only pending events
  const pendingEvents = events.filter(([, event]) => event.pending)

  // Get selected event details for display
  const selectedEvent = pendingEvents.find(([id]) => id.toString() === eventId)

  const handleEventSelect = (selectedEventId: string) => {
    setEventId(selectedEventId)
    setIsDropdownOpen(false)
  }

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.event-dropdown')) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeAddress || !appClient) {
      enqueueSnackbar('Please connect your wallet first', { variant: 'warning' })
      return
    }

    if (!eventId || !recipientYes || !recipientNo || !donationAmount) {
      enqueueSnackbar('Please fill in all fields', { variant: 'warning' })
      return
    }

    await createConditionalDonation(eventId, recipientYes, recipientNo, donationAmount)
  }

  // Show success notifications
  React.useEffect(() => {
    if (success) {
      enqueueSnackbar(success, { variant: 'success' })
      // Clear form on success but keep user address in recipientNo
      setEventId('')
      setRecipientYes('')
      setRecipientNo(activeAddress || '')
      setDonationAmount('')
    }
  }, [success, enqueueSnackbar])

  // Show error notifications
  React.useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [error, enqueueSnackbar])

  // Auto-fill recipient_no with user's address if empty
  const handleRecipientNoFocus = () => {
    if (!recipientNo && activeAddress) {
      setRecipientNo(activeAddress)
    }
  }

  return (
    <div className="card p-8">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Conditional Donation</h2>
        <p className="text-gray-600">Create a donation that activates based on real-world events</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Event
          </label>
          {eventsLoading ? (
            <div className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-500">
              Loading events...
            </div>
          ) : pendingEvents.length === 0 ? (
            <div className="w-full px-3 py-2 border border-gray-300 bg-gray-50 text-gray-500">
              No pending events available. Create an event in the Oracle tab first.
            </div>
          ) : (
            <div className="relative event-dropdown">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-3 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none text-left bg-white flex items-center justify-between"
              >
                {selectedEvent ? (
                  <div>
                    <div className="text-gray-900">{selectedEvent[1].eventString}</div>
                    <div className="text-sm text-gray-500 opacity-75">Oracle: {ellipseAddress(selectedEvent[1].oracleAddress)}</div>
                  </div>
                ) : (
                  <span className="text-gray-500">Select an event...</span>
                )}
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                  {pendingEvents.map(([id, event]) => (
                    <button
                      key={id.toString()}
                      type="button"
                      onClick={() => handleEventSelect(id.toString())}
                      className="w-full px-3 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                    >
                      <div className="text-gray-900">{event.eventString}</div>
                      <div className="text-sm text-gray-500 opacity-75 mt-1">Oracle: {ellipseAddress(event.oracleAddress)}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Select from available pending events
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Amount (ALGO)
          </label>
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="0.00"
            min="0.001"
            step="0.001"
            className="w-full px-3 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              If event occurs
            </label>
            <input
              type="text"
              value={recipientYes}
              onChange={(e) => setRecipientYes(e.target.value)}
              placeholder="Charity address"
              className="w-full px-3 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Funds go here if event happens</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              If event doesn't occur
            </label>
            <input
              type="text"
              value={recipientNo}
              onChange={(e) => setRecipientNo(e.target.value)}
              onFocus={handleRecipientNoFocus}
              placeholder={activeAddress ? "Your address (auto-filled)" : "Enter address"}
              className="w-full px-3 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Funds returned here if event doesn't happen</p>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-4">
          <p className="text-sm text-gray-700">
            <strong>Example:</strong> Select "Hurricane hits Miami" event, enter Red Cross address for "if occurs", and your funds will be sent there if the oracle confirms the hurricane happened, otherwise returned to you.
          </p>
        </div>

        <button
          type="submit"
          disabled={donationLoading || !activeAddress || !appClient}
          className="w-full btn-primary"
        >
          {donationLoading ? 'Creating...' : 'Create Conditional Donation'}
        </button>
      </form>
    </div>
  )
}
