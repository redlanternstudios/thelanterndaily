import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>404</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Page not found</p>
      <Link href="/" style={{ color: '#000', textDecoration: 'underline' }}>Go home</Link>
    </div>
  )
}
