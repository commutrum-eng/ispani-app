import Link from 'next/link'

// iSpani "g" logo mark — inline SVG
function IspaniLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 8C26.8 8 8 26.8 8 50s18.8 42 42 42c10.6 0 20.3-3.9 27.7-10.3V52H48v12h17.2c-3.2 6.3-9.8 10.6-17.2 10.6C33.6 74.6 22 63 22 50S33.6 25.4 48 25.4c7.8 0 14.8 3.4 19.7 8.8l9.5-9.5C70.1 17.5 59.6 8 50 8z" fill="#00C201"/>
      <circle cx="74" cy="26" r="7" fill="#00C201"/>
      <path d="M26 86 Q50 96 74 86" stroke="#00C201" strokeWidth="6" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: "AI Skills Matching",
    desc: "Our engine scans 10 → 50 → 100km to find the exact skills you need — in minutes, not days.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "No CVs Needed",
    desc: "Your completed gigs, ratings and trust score ARE your CV. Real work builds your reputation.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Escrow Protection",
    desc: "Payment is held securely until both parties confirm the job is done. Zero disputes.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "Instant Acceptance",
    desc: "Post a job, get matched, accept a worker — all within minutes. Like Uber, but for skills.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: "Live GPS Tracking",
    desc: "Employers see real-time worker location from Start Work to Finish — POPIA compliant.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Multi-Tenant Orgs",
    desc: "Companies manage teams, post jobs and track workers under one org ID — built for SMEs.",
  },
]

const HOW_IT_WORKS = [
  { step: "01", title: "Post a Job", desc: "Add skills, budget & location. Mark it urgent if needed.", who: "Employer" },
  { step: "02", title: "AI Matches Workers", desc: "Engine finds qualified workers nearby. Push notification sent instantly.", who: "System" },
  { step: "03", title: "Accept & Escrow", desc: "You review profiles, accept the best fit. Payment locked in escrow.", who: "Employer" },
  { step: "04", title: "Work & Track", desc: "Worker clicks Start — GPS tracking begins. You see them live on map.", who: "Both" },
  { step: "05", title: "Confirm & Pay", desc: "Both click Job Complete. Escrow releases. Reviews update trust score.", who: "Both" },
]

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--ispani-gray)', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>

      {/* NAV */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--ispani-gray-border)',
        padding: '0 32px', height: '64px',
        display: 'flex', alignItems: 'center', gap: '16px',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <IspaniLogo size={36} />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '22px', color: 'var(--ispani-dark)', letterSpacing: '-0.5px' }}>
            i<span style={{ color: 'var(--ispani-green)' }}>Spani</span>
          </span>
        </Link>
        <nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '24px' }}>
          {['Features', 'How It Works', 'For Employers', 'For Workers'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ispani-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--ispani-green)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--ispani-text-muted)')}
            >{item}</a>
          ))}
          <Link href="/login" className="btn-primary" style={{ padding: '9px 20px', fontSize: '14px', borderRadius: '10px' }}>
            Get Started
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ padding: '80px 32px 64px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
        <div>
          <div className="badge badge-green" style={{ marginBottom: '20px' }}>
            <svg width="10" height="10" viewBox="0 0 10 10" style={{ marginRight: '6px' }}>
              <circle cx="5" cy="5" r="5" fill="#00C201"/>
            </svg>
            Live in South Africa
          </div>
          <h1 style={{ fontSize: '56px', lineHeight: '1.1', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '24px' }}>
            Let&apos;s Find Your<br/>
            <span style={{ color: 'var(--ispani-green)' }}>Perfect Match</span>
          </h1>
          <p style={{ fontSize: '18px', lineHeight: '1.7', color: 'var(--ispani-text-muted)', marginBottom: '36px', maxWidth: '460px' }}>
            South Africa&apos;s instant-job matching engine. Post a gig, get matched by AI in minutes — waiters, plumbers, electricians, event staff — no CVs, no delays.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <Link href="/login" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              Post a Job
            </Link>
            <Link href="/login?role=worker" className="btn-outline">
              Find Work
            </Link>
          </div>
          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '32px' }}>
            {[['2 400+', 'Workers'], ['180+', 'Companies'], ['R4.2M+', 'Paid Out']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '22px', color: 'var(--ispani-dark)' }}>{num}</div>
                <div style={{ fontSize: '13px', color: 'var(--ispani-text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual — phone mockup cards */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '340px' }}>
            {/* Map card */}
            <div className="card" style={{ padding: '20px', marginBottom: '16px', background: 'var(--ispani-dark)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span style={{ color: '#888', fontSize: '12px' }}>Johannesburg, Gauteng</span>
              </div>
              {/* Fake map dots */}
              <div style={{ height: '120px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', position: 'relative', overflow: 'hidden' }}>
                {[['18%','30%','R2.4K'], ['55%','50%','R3.8K'], ['75%','20%','R1.8K'], ['35%','70%','R5.2K']].map(([l,t,pay]) => (
                  <div key={pay} style={{ position: 'absolute', left: l, top: t, transform: 'translate(-50%,-50%)' }}>
                    <div style={{ background: 'var(--ispani-green)', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '100px', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,194,1,0.4)' }}>{pay}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Worker card */}
            <div className="card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--ispani-green-light)', border: '3px solid var(--ispani-green)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px' }}>Sipho Ndlovu</div>
                  <div style={{ color: 'var(--ispani-text-muted)', fontSize: '12px' }}>Electrician · Level 4</div>
                  <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                    <span className="badge badge-green">4.9 ★</span>
                    <span className="badge badge-gray">2.1km</span>
                    <span className="badge badge-gray">47 gigs</span>
                  </div>
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '16px', color: 'var(--ispani-green)' }}>R350/hr</div>
              </div>
              <Link href="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center', borderRadius: '10px', padding: '11px 0' }}>
                Hire Now
              </Link>
            </div>

            {/* Floating urgency badge */}
            <div style={{ position: 'absolute', top: '-18px', right: '-18px', background: 'var(--ispani-dark)', color: '#fff', padding: '8px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, boxShadow: 'var(--shadow-float)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--ispani-green)', animation: 'pulse 1.5s infinite' }}></div>
              12 workers nearby
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '80px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className="badge badge-gray" style={{ marginBottom: '14px' }}>Why iSpani</div>
          <h2 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-1px', marginBottom: '14px' }}>Built different<span style={{ color: 'var(--ispani-green)' }}>.</span></h2>
          <p style={{ color: 'var(--ispani-text-muted)', fontSize: '17px', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
            Not a job board. Not ATS keyword-scanning. Real skills, real track records, real-time.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {FEATURES.map(f => (
            <div key={f.title} className="card" style={{ padding: '28px 24px', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-float)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{ width: '52px', height: '52px', background: 'var(--ispani-green-light)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '17px', marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ color: 'var(--ispani-text-muted)', fontSize: '14px', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: '80px 32px', background: 'var(--ispani-dark)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="badge badge-green" style={{ marginBottom: '14px' }}>Process</div>
            <h2 style={{ fontSize: '42px', fontWeight: 800, letterSpacing: '-1px', color: '#fff', marginBottom: '14px' }}>
              From post to paid<br/><span style={{ color: 'var(--ispani-green)' }}>in 5 steps.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} style={{ display: 'flex', gap: '24px', padding: '24px 0', borderBottom: i < HOW_IT_WORKS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '13px', color: 'var(--ispani-green)', minWidth: '32px', paddingTop: '4px' }}>{step.step}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '17px', color: '#fff', margin: 0 }}>{step.title}</h4>
                    <span className="badge" style={{ background: 'rgba(0,194,1,0.15)', color: 'var(--ispani-green)', fontSize: '10px' }}>{step.who}</span>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '96px 32px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
        <IspaniLogo size={64} />
        <h2 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-1.5px', margin: '24px 0 16px' }}>
          Ready to hire<br/><span style={{ color: 'var(--ispani-green)' }}>instantly?</span>
        </h2>
        <p style={{ color: 'var(--ispani-text-muted)', fontSize: '18px', lineHeight: '1.6', marginBottom: '40px' }}>
          Join companies and workers already using iSpani to fill urgent skills gaps across South Africa.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/login?role=employer" className="btn-primary" style={{ fontSize: '16px', padding: '14px 32px' }}>
            Post a Job Free
          </Link>
          <Link href="/login?role=worker" className="btn-outline" style={{ fontSize: '16px', padding: '14px 32px' }}>
            Find Work
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--ispani-gray-border)', padding: '32px', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IspaniLogo size={28} />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '16px', color: 'var(--ispani-dark)' }}>iSpani</span>
          <span style={{ color: 'var(--ispani-text-muted)', fontSize: '13px' }}>&mdash; by Commutrum</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy', 'Terms', 'POPIA Compliance', 'Contact'].map(item => (
            <a key={item} href="#" style={{ fontSize: '13px', color: 'var(--ispani-text-muted)', textDecoration: 'none' }}
              onMouseOver={e => (e.currentTarget.style.color = 'var(--ispani-green)')}
              onMouseOut={e => (e.currentTarget.style.color = 'var(--ispani-text-muted)')}
            >{item}</a>
          ))}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--ispani-text-muted)' }}>&copy; 2026 iSpani. All rights reserved.</div>
      </footer>

    </div>
  )
}
