import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | PC &amp; Mobile Phone Repair, 65 Sheen Lane, London SW14</title>
        <meta
          name="description"
          content="Contact our repair shop at 65 Sheen Lane, East Sheen, London SW14 8AD. Call 020 8878 7266, WhatsApp us or fill in the form. Walk-ins welcome Mon-Sat."
        />
        <link rel="canonical" href="https://sheenrepair.co.uk/contact" />
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-shell">
          <div className="max-w-6xl mx-auto px-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.82fr)] items-end">
            <div>
              <div className="mb-4 flex items-center gap-2 text-sm text-white/55">
                <Link to="/" className="transition-colors hover:text-white">Home</Link>
                <span>/</span>
                <span className="text-white/82">Contact</span>
              </div>
              <span className="section-label text-[var(--color-orange-soft)]">Visit, call, or message us</span>
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white md:text-5xl">
                Reach the shop quickly and choose the best way to start your repair.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/74 md:text-lg">
                Call, WhatsApp, or walk in. We&apos;re at 65 Sheen Lane, East Sheen SW14, and we keep the contact flow as straightforward as the repairs themselves.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="tel:02088787266" className="btn-primary">
                  Call 020 8878 7266
                </a>
                <a href="https://wa.me/442088787266" target="_blank" rel="noopener noreferrer" className="btn-outline-white">
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="panel-dark p-6 md:p-7">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-orange-soft)]">
                Quick contact summary
              </div>
              <div className="mt-5 space-y-4">
                {[
                  ['Phone', '020 8878 7266'],
                  ['Address', '65 Sheen Lane, East Sheen, London SW14 8AD'],
                  ['Opening', 'Mon-Fri 9:00am-6:30pm · Sat 9:30am-5:30pm'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4">
                    <div className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-orange-soft)]">
                      {label}
                    </div>
                    <div className="mt-2 text-sm font-semibold leading-relaxed text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad-tight border-b border-[var(--color-border)]/70 bg-[var(--color-cream)] pt-0">
        <div className="max-w-6xl mx-auto px-4 grid gap-4 sm:grid-cols-3">
          <a href="tel:02088787266" className="quick-action-card">
            <span className="quick-action-icon bg-[linear-gradient(135deg,var(--color-orange)_0%,var(--color-orange-deep)_100%)] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold text-[var(--color-ink)]">Call us</span>
              <span className="mt-1 block text-sm font-bold text-[var(--color-navy)]">020 8878 7266</span>
            </span>
          </a>

          <a
            href="https://wa.me/442088787266"
            target="_blank"
            rel="noopener noreferrer"
            className="quick-action-card"
          >
            <span className="quick-action-icon bg-[#25d366] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold text-[var(--color-ink)]">WhatsApp</span>
              <span className="mt-1 block text-sm font-bold text-[var(--color-navy)]">Message us directly</span>
            </span>
          </a>

          <div className="quick-action-card">
            <span className="quick-action-icon bg-[var(--color-navy)] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
            <span>
              <span className="block text-sm font-semibold text-[var(--color-ink)]">Visit us</span>
              <span className="mt-1 block text-sm font-bold text-[var(--color-navy)]">65 Sheen Lane, SW14 8AD</span>
            </span>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-start">
          <div className="panel-card p-6 md:p-7">
            <h2 className="text-2xl font-extrabold text-[var(--color-ink)]">Send us a message</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              Describe the fault and your device model. We aim to reply the same day when possible.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="space-y-5">
            <div className="info-tile p-5">
              <h3 className="text-lg font-extrabold text-[var(--color-ink)]">Opening hours</h3>
              <div className="mt-4 space-y-2 text-sm text-[var(--color-muted)]">
                {[
                  ['Monday', '9:00am – 6:30pm'],
                  ['Tuesday', '9:00am – 6:30pm'],
                  ['Wednesday', '9:00am – 6:30pm'],
                  ['Thursday', '9:00am – 6:30pm'],
                  ['Friday', '9:00am – 6:30pm'],
                  ['Saturday', '9:30am – 5:30pm'],
                  ['Sunday', 'Closed'],
                ].map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between gap-4 border-b border-[var(--color-border)]/65 pb-2 last:border-b-0 last:pb-0">
                    <span>{day}</span>
                    <span className={`font-semibold ${hours === 'Closed' ? 'text-[var(--color-clay)]' : 'text-[var(--color-ink)]'}`}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-tile p-5">
              <h3 className="text-lg font-extrabold text-[var(--color-ink)]">Address and access</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                65 Sheen Lane<br />
                East Sheen<br />
                London SW14 8AD
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                Close to East Sheen High Street. On-street parking is available on Sheen Lane and the shop is served by buses 33, 337, 419, and 493.
              </p>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white shadow-[0_16px_34px_rgba(37,23,8,0.06)]">
              <iframe
                title="PC & Mobile Phone Repair Shop — Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.3!2d-0.2706!3d51.4621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760b82b7c1e281%3A0x1!2s65+Sheen+Ln%2C+London+SW14+8AD!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="260"
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