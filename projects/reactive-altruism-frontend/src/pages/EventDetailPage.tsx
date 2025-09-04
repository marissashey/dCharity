
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppClient } from '../context/AppClientContext'
import { useEvents } from '../hooks/useEvents'
import { useClauses } from '../hooks/useClauses'

const EventDetailPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>()
  const { appClient } = useAppClient()
  // Use wallet address from appClient context if available
  // Use null for activeAddress if not available
  const activeAddress = null
  // Get event and clause hooks
  const { getEventInfo, loading: eventLoading, error: eventError } = useEvents(appClient, activeAddress)
  const { fetchClauses, clauses, loading: clausesLoading, error: clausesError } = useClauses(appClient, activeAddress)

  const [event, setEvent] = useState<import('../contracts/ResponsiveDonation').EventStruct | null>(null)
  const [donations, setDonations] = useState<[bigint, import('../contracts/ResponsiveDonation').ConditionalClauseStruct][]>([])

  // Fetch event details
  useEffect(() => {
    if (!eventId || !getEventInfo) return
    getEventInfo(eventId).then(setEvent)
  }, [eventId, getEventInfo])

  // Fetch clauses (donations)
  useEffect(() => {
    fetchClauses()
  }, [appClient])

  // Filter clauses for this event
  useEffect(() => {
    if (!eventId) return
    const filtered = clauses.filter(([_, clause]) => clause.eventId.toString() === eventId)
    setDonations(filtered)
  }, [clauses, eventId])

  // Removed useEffect for activeAddress, use sender from appClient directly

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Event Details</h1>
      <div className="card p-6 mb-6">
        <p className="text-gray-700 mb-2">
          Event ID: <span className="font-mono">{eventId}</span>
        </p>
        {eventLoading ? (
          <p className="text-gray-500">Loading event details...</p>
        ) : eventError ? (
          <p className="text-red-500">Error: {eventError}</p>
        ) : event ? (
          <>
            <p className="mb-2">
              <span className="font-semibold">Description:</span> {event.eventString}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Oracle:</span> <span className="font-mono">{event.oracleAddress}</span>
            </p>
            <p className="mb-2">
              <span className="font-semibold">Pending:</span> {event.pending ? 'Yes' : 'No'}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Resolution:</span> {event.pending ? 'Unresolved' : event.resolution ? 'True' : 'False'}
            </p>
          </>
        ) : (
          <p className="text-gray-500">No event details found.</p>
        )}
      </div>
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Donations for this Event</h2>
        {clausesLoading ? (
          <p className="text-gray-500">Loading donations...</p>
        ) : clausesError ? (
          <p className="text-red-500">Error: {clausesError}</p>
        ) : donations.length === 0 ? (
          <p className="text-gray-500">No donations found for this event.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {donations.map(([clauseId, clause]) => (
              <li key={clauseId.toString()} className="py-4">
                <div className="flex flex-col">
                  <span className="font-mono text-sm text-gray-600 mb-1">Clause ID: {clauseId.toString()}</span>
                  <span>
                    <span className="font-semibold">Donor:</span> <span className="font-mono">{clause.donorAddress}</span>
                  </span>
                  <span>
                    <span className="font-semibold">Amount:</span> {Number(clause.payoutAmount) / 1e6} ALGO
                  </span>
                  <span>
                    <span className="font-semibold">Recipient (Yes):</span> <span className="font-mono">{clause.recipientYes}</span>
                  </span>
                  <span>
                    <span className="font-semibold">Recipient (No):</span> <span className="font-mono">{clause.recipientNo}</span>
                  </span>
                  <span>
                    <span className="font-semibold">Executed:</span> {clause.executed ? 'Yes' : 'No'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default EventDetailPage
