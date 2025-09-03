import { useEffect, useState } from 'react'
import { useAppClient } from '../context/AppClientContext'
import { useEvents } from '../hooks/useEvents'
import { EventStruct } from '../contracts/ResponsiveDonation'
import { ellipseAddress } from '../utils/ellipseAddress'

export default function RecentEventsList() {
  const { appClient } = useAppClient()
  const { events, fetchEvents, loading } = useEvents(appClient)
  const [recentEvents, setRecentEvents] = useState<Array<[bigint, EventStruct]>>([])

  useEffect(() => {
    if (appClient) {
      fetchEvents()
    }
  }, [appClient, fetchEvents])

  useEffect(() => {
    // Sort by most recent (assuming eventId is monotonic)
    const sorted = [...events].sort((a, b) => Number(b[0]) - Number(a[0]))
    setRecentEvents(sorted.slice(0, 5))
  }, [events])

  if (loading) {
    return <p className="text-gray-600">Loading recent events...</p>
  }

  if (recentEvents.length === 0) {
    return <p className="text-gray-600">No recent events found.</p>
  }

  return (
    <ul className="space-y-4">
      {recentEvents.map(([eventId, event]) => (
        <li key={eventId.toString()} className="border rounded p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Event ID: {eventId.toString()}</span>
            {event.pending ? (
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Pending</span>
            ) : (
              <span className={`px-2 py-1 text-xs ${event.resolution ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} rounded`}>
                {event.resolution ? 'Resolved: True' : 'Resolved: False'}
              </span>
            )}
          </div>
          <div className="font-medium text-gray-900 mb-1">{event.eventString}</div>
          <div className="text-xs text-gray-600 mb-1">Oracle: <span className="font-mono">{ellipseAddress(event.oracleAddress)}</span></div>
          <div className="text-xs text-gray-500">{event.pending ? 'Created' : 'Resolved'} {event.timestamp ? `- ${new Date(Number(event.timestamp) * 1000).toLocaleString()}` : ''}</div>
        </li>
      ))}
    </ul>
  )
}
