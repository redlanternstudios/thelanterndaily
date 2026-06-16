'use client'
import { useState } from 'react'

export function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [operatorNumber, setOperatorNumber] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setOperatorNumber(String(data.operator_number).padStart(4, '0'))
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="text-green-600 dark:text-green-400 font-medium">
          You're in! Your operator number is #{operatorNumber}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required
        className="flex-1 px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button type="submit" disabled={status === 'loading'}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
        {status === 'loading' ? 'Joining...' : 'Join Free'}
      </button>
      {status === 'error' && <p className="text-red-500 text-xs mt-1">Something went wrong.</p>}
    </form>
  )
}
