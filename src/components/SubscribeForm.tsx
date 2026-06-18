'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface SubscribeFormProps {
  variant?: 'default' | 'large' | 'inline'
  placeholder?: string
  buttonText?: string
}

export default function SubscribeForm({
  variant = 'default',
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
}: SubscribeFormProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error')
      setErrorMsg('Please enter a valid email address')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      if (data.operator_number) {
        router.push(`/confirmed?number=${data.operator_number}`)
      } else {
        router.push('/confirmed')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
        placeholder={placeholder}
        className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50 transition-colors"
        disabled={status === 'loading'}
        required
        aria-label="Email address"
      />
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-6 py-3 rounded-lg text-sm transition-all disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'loading' ? 'Sending...' : status === 'success' ? 'Subscribed!' : buttonText}
      </button>
      {status === 'error' && (
        <p className="text-xs text-red-400 mt-1 w-full text-center">{errorMsg}</p>
      )}
    </form>
  )
}
