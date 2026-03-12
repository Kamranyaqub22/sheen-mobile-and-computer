import { useState } from 'react'

export default function ContactForm({ light = false }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    device: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In production — connect to your backend / Formspree / EmailJS here
    setSubmitted(true)
  }

  const labelClass = `block text-sm font-medium mb-1.5 ${light ? 'text-white/80' : 'text-gray-700'}`

  if (submitted) {
    return (
      <div
        className="rounded border p-6 text-center"
        style={{
          backgroundColor: light ? 'rgba(255,255,255,0.08)' : '#f0fdf4',
          borderColor: light ? 'rgba(255,255,255,0.2)' : '#86efac',
        }}
      >
        <svg className="mx-auto mb-3" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <p className={`font-semibold ${light ? 'text-white' : 'text-gray-800'}`}>Message received — thank you!</p>
        <p className={`text-sm mt-1 ${light ? 'text-white/70' : 'text-gray-500'}`}>
          We&apos;ll get back to you as soon as we can. If it&apos;s urgent, please call{' '}
          <a href="tel:02088787266" className="underline font-medium">020 8878 7266</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name <span style={{ color: '#c0392b' }}>*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="form-input"
            style={light ? { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' } : {}}
            placeholder="e.g. John Smith"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="form-input"
            style={light ? { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' } : {}}
            placeholder="e.g. 07700 900000"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email address <span style={{ color: '#c0392b' }}>*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="form-input"
          style={light ? { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' } : {}}
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="device" className={labelClass}>Device &amp; issue</label>
        <input
          id="device"
          name="device"
          type="text"
          className="form-input"
          style={light ? { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' } : {}}
          placeholder="e.g. iPhone 14 — cracked screen"
          value={form.device}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="form-input resize-y"
          style={light ? { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.25)', color: '#fff' } : {}}
          placeholder="Tell us more about the problem, or ask a question..."
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-primary w-full sm:w-auto justify-center">
        Send Enquiry
      </button>

      <p className={`text-xs ${light ? 'text-white/50' : 'text-gray-400'}`}>
        Or call us directly on{' '}
        <a href="tel:02088787266" className={`font-medium ${light ? 'text-white/80 hover:text-white' : 'text-navy hover:underline'}`} style={!light ? { color: '#1c2d4a' } : {}}>
          020 8878 7266
        </a>
        {' '}for a faster response.
      </p>
    </form>
  )
}
