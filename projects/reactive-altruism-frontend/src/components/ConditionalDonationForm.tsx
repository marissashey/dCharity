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
            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 focus:border-gray-900 focus:outline-none"
              required
            >
              <option value="">Select an event...</option>
              {pendingEvents.map(([id, event]) => (
                <option key={id.toString()} value={id.toString()}>
                  ID: {id.toString()} | {event.eventString.slice(0, 50)}{event.eventString.length > 50 ? '...' : ''} | Oracle: {ellipseAddress(event.oracleAddress)}
                </option>
              ))}
            </select>
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
