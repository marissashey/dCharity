import { microAlgo } from '@algorandfoundation/algokit-utils'
import { useState } from 'react'
import { ResponsiveDonationClient } from '../contracts/ResponsiveDonation'

export function useAutoExecution(appClient: ResponsiveDonationClient | null, activeAddress: string | null | undefined) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const executeClausesForEvent = async (eventId: string) => {
    if (!appClient || !activeAddress) {
      setError('Please connect your wallet first')
      return null
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await appClient.send.executeClausesForEvent({
        args: {
          eventId: BigInt(eventId),
        },
        extraFee: microAlgo(2000), // Extra fee for multiple inner transactions
      })

      const executedCount = result.return
      if (executedCount && executedCount > 0n) {
        setSuccess(`Successfully executed ${executedCount} conditional donations! Transaction ID: ${result.transaction.txID()}`)
      } else {
        setSuccess('No pending donations found for this event.')
      }

      return executedCount
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to execute conditional donations')
      return null
    } finally {
      setLoading(false)
    }
  }

  const getClausesForEvent = async (eventId: string) => {
    if (!appClient) {
      return []
    }

    try {
      const result = await appClient.send.getClausesForEvent({
        args: {
          eventId: BigInt(eventId),
        },
      })

      return result.return || []
    } catch (e) {
      console.error('Failed to get clauses for event:', e)
      return []
    }
  }

  return {
    executeClausesForEvent,
    getClausesForEvent,
    loading,
    error,
    success,
    setSuccess,
    setError,
  }
}
