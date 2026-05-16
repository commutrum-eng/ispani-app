import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

function IspaniLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 8C26.8 8 8 26.8 8 50s18.8 42 42 42c10.6 0 20.3-3.9 27.7-10.3V52H48v12h17.2c-3.2 6.3-9.8 10.6-17.2 10.6C33.6 74.6 22 63 22 50S33.6 25.4 48 25.4c7.8 0 14.8 3.4 19.7 8.8l9.5-9.5C70.1 17.5 59.6 8 50 8z" fill="#00C201"/>
      <circle cx="74" cy="26" r="7" fill="#00C201"/>
      <path d="M26 86 Q50 96 74 86" stroke="#00C201" strokeWidth="6" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

const WORKER_JOBS = [
  { id: 1, title: 'Event Waiter', company: 'Sandton Events Co', pay: 'R280/hr', distance: '1.4km', urgent: true, skills: ['Hospitality', 'Events'] },
  { id: 2, title: 'Electrician Needed', company: 'BuildRight SA', pay: 'R420/hr', distance: '3.2km', urgent: true, skills: ['Electrical', 'Level 3+'] },
  { id: 3, title: 'Plumber — 2 Days', company: 'HomeFix Pty', pay: 'R380/hr', distance: '5.8km', urgent: false, skills: ['Plumbing'] },
]

const EMPLOYER_STATS = [
  { label: 'Active Jobs', value: '3', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
  { label: 'Workers Matched', value: '24', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { label: 'Gigs Completed', value: '18', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
  { label: 'Escrow Held', value: 'R14.2K', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const role = (user.user_metadata?.role as string) || 'worker'
  const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  const isEmployer = role === 'employer'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ispani-gray)', display: 'flex', flexDirection: 'column' }}>

      {/* Top nav */}
      <header style={{ background: 'var(--ispani-white)', borderBottom: '1px solid var(--ispani-gray-border)', padding: '0 32px', height: '64px', display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 40, boxShadow: 'var(--shadow-card)' }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <IspaniLogo size={32} />
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '20px', color: 'var(--ispani-dark)' }}>
            i<span style={{ color: 'var(--ispani-green)' }}>Spani</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '4px', marginLeft: '32px' }}>
          {(isEmployer
            ? ['Dashboard', 'Post Job', 'Active Gigs', 'Workers', 'Escrow']
            : ['Dashboard', 'Browse Jobs', 'My Gigs', 'Profile', 'Earnings']
          ).map((item, i) => (
            <a key={item} href="#"
              style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'all 0.15s',
                background: i === 0 ? 'var(--ispani-green-light)' : 'transparent',
                color: i === 0 ? 'var(--ispani-green)' : 'var(--ispani-text-muted)',
              }}
            >{item}</a>
          ))}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Notification bell */}
          <button style={{ width: '38px', height: '38px', borderRadius: '10px', border: '1.5px solid var(--ispani-gray-border)', background: 'var(--ispani-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ispani-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', background: 'var(--ispani-green)', borderRadius: '50%', border: '2px solid white' }}></span>
          </button>

          {/* Avatar */}
          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--ispani-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '14px', color: '#fff', cursor: 'pointer' }}>
            {name.charAt(0).toUpperCase()}
          </div>

          <form action="/auth/signout" method="post">
            <button style={{ fontSize: '13px', fontWeight: 500, color: 'var(--ispani-text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>Sign out</button>
          </form>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

        {/* Welcome */}
        <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="badge badge-green" style={{ marginBottom: '8px' }}>
              {isEmployer ? 'Employer Dashboard' : 'Worker Dashboard'}
            </div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '28px', letterSpacing: '-0.5px', marginBottom: '4px' }}>
              Good day, {name} 👋
            </h1>
            <p style={{ color: 'var(--ispani-text-muted)', fontSize: '14px' }}>
              {isEmployer ? 'Manage jobs, track workers and release payments.' : 'Find urgent gigs matching your skills near you.'}
            </p>
          </div>
          {isEmployer ? (
            <Link href="#" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Post New Job
            </Link>
          ) : (
            <Link href="#" className="btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              Browse Jobs
            </Link>
          )}
        </div>

        {/* EMPLOYER VIEW */}
        {isEmployer && (
          <>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {EMPLOYER_STATS.map(stat => (
                <div key={stat.label} className="card" style={{ padding: '22px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--ispani-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '24px', color: 'var(--ispani-dark)' }}>{stat.value}</div>
                    <div style={{ fontSize: '12px', color: 'var(--ispani-text-muted)', marginTop: '2px' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Active jobs */}
            <div className="card" style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px' }}>Active Jobs</h2>
                <a href="#" style={{ fontSize: '13px', color: 'var(--ispani-green)', fontWeight: 600, textDecoration: 'none' }}>View All</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {WORKER_JOBS.map(job => (
                  <div key={job.id} style={{ padding: '16px 18px', background: 'var(--ispani-gray)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px' }}>{job.title}</span>
                        {job.urgent && <span className="badge badge-dark" style={{ fontSize: '9px' }}>URGENT</span>}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--ispani-text-muted)' }}>{job.skills.join(' · ')}</div>
                    </div>
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: 'var(--ispani-green)', fontSize: '15px' }}>{job.pay}</div>
                    <div className="badge badge-green">Open</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* WORKER VIEW */}
        {!isEmployer && (
          <>
            {/* Quick stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Trust Score', value: '87/100', color: 'var(--ispani-green)' },
                { label: 'Gigs Completed', value: '14', color: 'var(--ispani-dark)' },
                { label: 'Avg Rating', value: '4.8 ★', color: 'var(--ispani-dark)' },
              ].map(s => (
                <div key={s.label} className="card" style={{ padding: '24px 22px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '30px', color: s.color, marginBottom: '4px' }}>{s.value}</div>
                  <div style={{ fontSize: '13px', color: 'var(--ispani-text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Jobs nearby */}
            <div className="card" style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '18px', marginBottom: '2px' }}>Jobs Matched for You</h2>
                  <p style={{ fontSize: '12px', color: 'var(--ispani-text-muted)' }}>Based on your skills · sorted by distance</p>
                </div>
                <a href="#" style={{ fontSize: '13px', color: 'var(--ispani-green)', fontWeight: 600, textDecoration: 'none' }}>See All</a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {WORKER_JOBS.map(job => (
                  <div key={job.id} className="card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1.5px solid var(--ispani-gray-border)' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--ispani-green-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C201" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '15px' }}>{job.title}</span>
                        {job.urgent && <span className="badge badge-dark" style={{ fontSize: '9px', padding: '2px 7px' }}>URGENT</span>}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--ispani-text-muted)' }}>{job.company} · {job.distance}</div>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                        {job.skills.map(s => <span key={s} className="badge badge-gray" style={{ fontSize: '10px' }}>{s}</span>)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '16px', color: 'var(--ispani-green)', marginBottom: '8px' }}>{job.pay}</div>
                      <button className="btn-primary" style={{ padding: '7px 16px', fontSize: '13px', borderRadius: '8px' }}>Apply</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
