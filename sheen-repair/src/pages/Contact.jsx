import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Sheen Repair — 65 Sheen Lane, East Sheen London SW14</title>
        <meta
          name="description"
          content="Contact Sheen Repair at 65 Sheen Lane, East Sheen, London SW14 8AD. Call 020 8878 7266, WhatsApp us or fill in the form. Walk-ins welcome Mon-Sat."
        />
        <link rel="canonical" href="https://sheenrepair.co.uk/contact" />
      </Helmet>

      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-shell">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-4 flex items-center gap-2 text-sm text-white/50">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span>Contact</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase leading-tight">
              Contact<br /><span className="text-[var(--color-red)]">the Shop</span>
            </h1>
            <p className="mt-5 max-w-xl text-white/60 text-lg leading-relaxed">
              Call, WhatsApp, or walk in. We're at 65 Sheen Lane, East Sheen SW14 —
              open Monday to Saturday.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="tel:02088787266" className="btn-primary">Call 020 8878 7266</a>
              <a href="https://wa.me/442088787266" target="_blank" rel="noopener noreferrer" className="btn-outline-white">WhatsApp Us</a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick contact row */}
      <section className="border-b border-[var(--color-border)] bg-[var(--color-bg-alt)]">
        <div className="max-w-6xl mx-auto px-4 py-6 grid sm:grid-cols-3 gap-3">
          <a href="tel:02088787266" className="quick-action-card">
            <span className="quick-action-icon bg-[var(--color-red)] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </span>
            <span>
              <span className="block text-sm font-bold text-[var(--color-text)]">Call us</span>
              <span className="block text-sm text-[var(--color-muted)]">020 8878 7266</span>
            </span>
          </a>
          <a href="https://wa.me/442088787266" target="_blank" rel="noopener noreferrer" className="quick-action-card">
            <span className="quick-action-icon bg-[#25d366] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </span>
            <span>
              <span className="block text-sm font-bold text-[var(--color-text)]">WhatsApp</span>
              <span className="block text-sm text-[var(--color-muted)]">Message us directly</span>
            </span>
          </a>
          <div className="quick-action-card">
            <span className="quick-action-icon bg-[#111111] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
            <span>
              <span className="block text-sm font-bold text-[var(--color-text)]">Visit us</span>
              <span className="block text-sm text-[var(--color-muted)]">65 Sheen Lane, SW14 8AD</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-pad bg-white">
        <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-[1fr_1fr] items-start">
          <div>
            <h2 className="text-3xl font-black text-[var(--color-text)] uppercase mb-2">Send Us a Message</h2>
            <p className="text-sm text-[var(--color-muted)] mb-6">
              Describe the fault and your device model. We aim to reply the same day when possible.
            </p>
            <ContactForm />
          </div>

          <div className="space-y-5">
            <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl p-5">
              <h3 className="font-bold text-[var(--color-text)] mb-4">Opening Hours</h3>
              <div className="space-y-2 text-sm text-[var(--color-muted)]">
                {[
                  ['Monday', '9:00 am – 6:30 pm'],
                  ['Tuesday', '9:00 am – 6:30 pm'],
                  ['Wednesday', '9:00 am – 6:30 pm'],
                  ['Thursday', '9:00 am – 6:30 pm'],
                  ['Friday', '9:00 am – 6:30 pm'],
                  ['Saturday', '9:30 am – 5:30 pm'],
                  ['Sunday', 'Closed'],
                ].map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-2 last:border-b-0 last:pb-0">
                    <span>{day}</span>
                    <span className={`font-semibold ${hours === 'Closed' ? 'text-[var(--color-muted)]' : 'text-[var(--color-text)]'}`}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl p-5">
              <h3 className="font-bold text-[var(--color-text)] mb-3">Address & Getting Here</h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                65 Sheen Lane<br />East Sheen<br />London SW14 8AD
              </p>
              <p className="mt-3 text-sm text-[var(--color-muted)] leading-relaxed">
                Close to East Sheen High Street. On-street parking on Sheen Lane.
                Served by buses 33, 337, 419, and 493.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
              <iframe
                title="Sheen Repair — Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.3!2d-0.2706!3d51.4621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760b82b7c1e281%3A0x1!2s65+Sheen+Ln%2C+London+SW14+8AD!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="240"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

