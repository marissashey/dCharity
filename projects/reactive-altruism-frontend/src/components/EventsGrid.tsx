import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '@txnlab/use-wallet-react'
import { useSnackbar } from 'notistack'
import { useAppClient } from '../context/AppClientContext'
import { useEvents } from '../hooks/useEvents'
import { useAutoExecution } from '../hooks/useAutoExecution'
import { EventStruct } from '../contracts/ResponsiveDonation'
import { ellipseAddress } from '../utils/ellipseAddress'

export default function EventsGrid() {
  const navigate = useNavigate()
  const { activeAddress } = useWallet()
  const { enqueueSnackbar } = useSnackbar()
  const { appClient } = useAppClient()
  const { events, fetchEvents, resolveEvent, loading, error, success } = useEvents(appClient, activeAddress)
  const {
    executeClausesForEvent,
    getClausesForEvent,
    loading: autoExecLoading,
    error: autoExecError,
    success: autoExecSuccess,
  } = useAutoExecution(appClient, activeAddress)

  const [_selectedEvent, _setSelectedEvent] = useState<[bigint, EventStruct] | null>(null)
  const [_resolution, _setResolution] = useState<boolean>(true)

  useEffect(() => {
    if (appClient) {
      fetchEvents()
    }
  }, [appClient, fetchEvents])

  // Show error notifications
  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: 'error' })
    }
  }, [error, enqueueSnackbar])

  useEffect(() => {
    if (autoExecError) {
      enqueueSnackbar(autoExecError, { variant: 'error' })
    }
  }, [autoExecError, enqueueSnackbar])

  // Show success notifications
  useEffect(() => {
    if (success) {
      enqueueSnackbar(success, { variant: 'success' })
    }
  }, [success, enqueueSnackbar])

  useEffect(() => {
    if (autoExecSuccess) {
      enqueueSnackbar(autoExecSuccess, { variant: 'success' })
    }
  }, [autoExecSuccess, enqueueSnackbar])

  const handleResolveEvent = async (eventId: string, resolution: boolean) => {
    try {
      // First, resolve the event
      await resolveEvent(eventId, resolution)
      _setSelectedEvent(null)

      // Then automatically execute all conditional donations for this event
      const clauseIds = await getClausesForEvent(eventId)
      if (clauseIds && clauseIds.length > 0) {
        enqueueSnackbar(`Event resolved! Found ${clauseIds.length} conditional donations to execute...`, {
          variant: 'info',
        })

        // Execute all clauses for this event
        await executeClausesForEvent(eventId)

        // Refresh the events list to show updated status
        await fetchEvents()
      } else {
        enqueueSnackbar('Event resolved! No conditional donations found for this event.', { variant: 'info' })
      }
    } catch (error) {
      // Error will be handled by the useEvents hook
    }
  }

  const canResolveEvent = (event: EventStruct) => {
    return activeAddress && event.oracleAddress.toLowerCase() === activeAddress.toLowerCase() && event.pending
  }

  const getStatusBadge = (event: EventStruct) => {
    if (event.pending) {
      return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">Pending</span>
    } else {
      const resolvedText = event.resolution ? 'Resolved: True' : 'Resolved: False'
      const bgColor = event.resolution ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      return <span className={`px-2 py-1 text-xs ${bgColor} rounded`}>{resolvedText}</span>
    }
  }

  if (loading || autoExecLoading) {
    return (
      <div className="card p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {autoExecLoading ? 'Executing conditional donations...' : 'Loading events...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Available Events</h2>
        <button onClick={fetchEvents} className="btn-secondary" disabled={loading}>
          Refresh
        </button>
      </div>

      {events.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-gray-600">No events created yet.</p>
          <p className="text-sm text-gray-500 mt-2">Create an event to enable conditional donations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(([eventId, event]) => (
            <div key={eventId.toString()} className="card p-6">
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-500">Event ID: {eventId.toString()}</span>
                  {getStatusBadge(event)}
                </div>
                <button
                  className="mb-2 px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
                  onClick={() => navigate(`/event/${eventId.toString()}`)}
                >
                  View Details
                </button>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{event.eventString}</h3>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Oracle:</span> <span className="font-mono">{ellipseAddress(event.oracleAddress)}</span>
                </div>
              </div>

              {canResolveEvent(event) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-blue-600 mb-3">You can resolve this event</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleResolveEvent(eventId.toString(), true)}
                      className="flex-1 px-3 py-2 text-sm bg-green-600 text-white hover:bg-green-700 transition-colors"
                      disabled={loading}
                    >
                      Resolve: True
                    </button>
                    <button
                      onClick={() => handleResolveEvent(eventId.toString(), false)}
                      className="flex-1 px-3 py-2 text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
                      disabled={loading}
                    >
                      Resolve: False
                    </button>
                  </div>
                </div>
              )}

              {!event.pending && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    This event has been resolved. Conditional donations are executed automatically.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
