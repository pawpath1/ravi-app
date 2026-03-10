import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/AuthProvider'
import './Dashboard.css'

const WEEK_PLAN = [
  {
    week: 10,
    label: 'Week 10',
    current: true,
    priority: 'House training foundation + safe settling in',
    normal: ['Sleeping 18–20 hours per day', 'Toilet accidents every 2–3 hours', 'Crying when alone at night', 'Not yet fully vaccinated — limited outdoor exposure'],
    flags: ['Not eating for 12+ hours', 'Lethargy combined with vomiting', 'Blood in stool', 'Difficulty breathing'],
    focus: ['Go outside every 1–2 hours', 'Create a safe sleeping area', 'Begin name recognition training', 'No dog parks or unvaccinated dog contact'],
  },
  {
    week: 11,
    label: 'Week 11',
    current: false,
    priority: 'Crate training + handling preparation',
    normal: ['More alert periods, wants to explore', 'Baby teeth coming through — everything in mouth', 'Starting to play more actively'],
    flags: ['Biting that draws blood', 'Refusing all food 8+ hours', 'Persistent diarrhea 24+ hours'],
    focus: ['Crate training 30–60 min periods', 'Gentle handling of paws, mouth, ears', 'Introduce puzzle feeding toys', 'First vaccination appointment'],
  },
  {
    week: 12,
    label: 'Week 12',
    current: false,
    priority: 'Early socialisation begins + second vaccination',
    normal: ['Second vaccination due', 'More confident movement and play', 'Learning bite inhibition', 'Sleeping 16–18 hours'],
    flags: ['Hard biting without backing off', 'Refusing lead entirely', 'Excessive fear of household sounds'],
    focus: ['Enrol in puppy socialisation class', 'Lead training in apartment/hallway', 'Positive association with handling', 'Can start meeting vaccinated dogs'],
  },
  {
    week: 13,
    label: 'Week 13',
    current: false,
    priority: 'Socialisation window peak + basic obedience',
    normal: ['Rapid learning of basic commands', 'Increased confidence and curiosity', 'Better bite control', 'Bladder holds 3–4 hour stretches'],
    flags: ['Aggression toward people or other dogs', 'Toilet training regression', 'Loss of appetite with lethargy'],
    focus: ['Puppy school starts', 'Exposure to surfaces, sounds, people', '"Sit" and "stay" foundation', 'Short walks increasing'],
  },
]

const PRODUCTS = [
  {
    name: 'Kong Classic Puppy',
    size: 'Small',
    why: 'Mental stimulation during long apartment periods. Stuffed with treats, keeps Buddy occupied and creates positive crate associations.',
    price: '$19.95',
    retailer: 'Pet Circle',
    badge: 'Free delivery over $39',
    emoji: '🦴',
    accent: '#F97316',
  },
  {
    name: 'Nina Ottosson Puzzle Feeder',
    size: 'Level 1',
    why: 'Golden Retrievers need mental exercise when physical exercise is limited pre-vaccination. Slows eating, prevents boredom.',
    price: '$24.99',
    retailer: 'Petbarn',
    badge: 'Available in-store',
    emoji: '🧩',
    accent: '#22C55E',
  },
  {
    name: 'Puppy Playpen',
    size: '8-Panel, 80cm High',
    why: 'Safe containment in apartment when you can\'t supervise. Prevents destructive behaviour and creates toilet training boundaries.',
    price: '$149',
    retailer: 'PetStock',
    badge: '20% off for new customers',
    emoji: '🏡',
    accent: '#8B5CF6',
  },
]

export default function Dashboard() {
  const { signOut } = useAuthContext()
  const navigate = useNavigate()
  const [activeWeek, setActiveWeek] = useState(10)
  const [planTab, setPlanTab] = useState('focus')

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const weekData = WEEK_PLAN.find(w => w.week === activeWeek)

  return (
    <div className="pw-root">

      <nav className="pw-nav">
        <div className="pw-nav-brand">
          <span className="pw-nav-paw">🐾</span>
          <span className="pw-nav-name">PawPath</span>
        </div>
        <div className="pw-nav-actions">
          <button className="pw-vet-btn">🚨 Emergency Vet</button>
          <button className="pw-out-btn" onClick={handleSignOut}>Sign out</button>
        </div>
      </nav>

      <main className="pw-main">

        {/* ── Hero ── */}
        <section className="pw-hero">
          <div className="pw-hero-left">
            <p className="pw-hero-eyebrow">Day 3 with Buddy</p>
            <h1 className="pw-hero-h1">You're doing<br/>great, Sarah.</h1>
            <p className="pw-hero-sub">Buddy is 10 weeks old — right in the most important window of his life. Here's everything you need this week.</p>
          </div>
          <div className="pw-buddy-chip">
            <div className="pw-buddy-avi">🐶</div>
            <div className="pw-buddy-details">
              <p className="pw-buddy-name">Buddy</p>
              <p className="pw-buddy-breed">Golden Retriever · 10 weeks</p>
              <div className="pw-buddy-tags">
                <span className="pw-tag">Apartment</span>
                <span className="pw-tag">First-time owner</span>
                <span className="pw-tag">Pre-vaccination</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Priority card ── */}
        <section className="pw-priority">
          <div className="pw-priority-label">THIS WEEK'S PRIORITY</div>
          <h2 className="pw-priority-h2">Toilet Training Buddy in Your Apartment</h2>
          <div className="pw-stats">
            <div className="pw-stat">
              <span className="pw-stat-big">Every 1–2 hrs</span>
              <span className="pw-stat-desc">Take Buddy outside during the day</span>
            </div>
            <div className="pw-stat-div"/>
            <div className="pw-stat">
              <span className="pw-stat-big">After every meal</span>
              <span className="pw-stat-desc">Outside after eating, sleeping & playing</span>
            </div>
            <div className="pw-stat-div"/>
            <div className="pw-stat">
              <span className="pw-stat-big">2–3 accidents</span>
              <span className="pw-stat-desc">Per day is completely normal — you're not failing</span>
            </div>
          </div>
          <button className="pw-cta">See Your Week 1 Toilet Training Plan →</button>
        </section>

        {/* ── Quick access ── */}
        <section className="pw-section">
          <h2 className="pw-section-h2">Quick Access</h2>
          <div className="pw-quick-grid">
            <div className="pw-quick pw-quick--vet">
              <span className="pw-quick-icon">🏥</span>
              <div className="pw-quick-text">
                <p className="pw-quick-title">Emergency Vet Finder</p>
                <p className="pw-quick-sub">24hr vet near you in 2 taps</p>
              </div>
              <span className="pw-quick-arr">→</span>
            </div>
            <div className="pw-quick pw-quick--dev">
              <span className="pw-quick-icon">📈</span>
              <div className="pw-quick-text">
                <p className="pw-quick-title">Buddy's Development This Week</p>
                <p className="pw-quick-sub">What's normal at 10 weeks</p>
              </div>
              <span className="pw-quick-arr">→</span>
            </div>
            <div className="pw-quick pw-quick--shop">
              <span className="pw-quick-icon">🛍️</span>
              <div className="pw-quick-text">
                <p className="pw-quick-title">New Puppy Shopping List</p>
                <p className="pw-quick-sub">Apartment-specific essentials</p>
              </div>
              <span className="pw-quick-arr">→</span>
            </div>
          </div>
        </section>

        {/* ── Month plan ── */}
        <section className="pw-section">
          <div className="pw-plan-header">
            <h2 className="pw-section-h2">Buddy's Month 1 Plan</h2>
            <span className="pw-progress-badge">Week 1 of 4 · On track ✓</span>
          </div>

          <div className="pw-week-tabs">
            {WEEK_PLAN.map(w => (
              <button
                key={w.week}
                onClick={() => { setActiveWeek(w.week); setPlanTab('focus') }}
                className={`pw-wtab ${activeWeek === w.week ? 'pw-wtab--active' : ''}`}
              >
                {w.current && <span className="pw-current-dot"/>}
                {w.label}
                {w.current && <span className="pw-now-badge">NOW</span>}
              </button>
            ))}
          </div>

          {weekData && (
            <div className="pw-week-body">
              <p className="pw-week-focus-label">Priority</p>
              <p className="pw-week-focus-val">{weekData.priority}</p>

              <div className="pw-ptabs">
                <button className={`pw-ptab ${planTab === 'focus' ? 'pw-ptab--active' : ''}`} onClick={() => setPlanTab('focus')}>✅ Focus</button>
                <button className={`pw-ptab ${planTab === 'normal' ? 'pw-ptab--active' : ''}`} onClick={() => setPlanTab('normal')}>📋 What's Normal</button>
                <button className={`pw-ptab pw-ptab--flags ${planTab === 'flags' ? 'pw-ptab--active pw-ptab--flags-active' : ''}`} onClick={() => setPlanTab('flags')}>🚩 Red Flags</button>
              </div>

              <ul className="pw-list">
                {weekData[planTab].map((item, i) => (
                  <li key={i} className={`pw-list-item ${planTab === 'flags' ? 'pw-list-item--flag' : ''}`}>
                    <span className="pw-list-dot"/>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* ── Products ── */}
        <section className="pw-section">
          <h2 className="pw-section-h2">Recommended for Week 10</h2>
          <p className="pw-products-sub">Chosen for Buddy's age and your apartment. These are part of the plan, not ads.</p>
          <div className="pw-products-grid">
            {PRODUCTS.map((p, i) => (
              <div key={i} className="pw-product">
                <div className="pw-product-icon" style={{ background: p.accent + '18', color: p.accent }}>{p.emoji}</div>
                <p className="pw-product-name">{p.name} <span className="pw-product-size">({p.size})</span></p>
                <p className="pw-product-why">{p.why}</p>
                <div className="pw-product-foot">
                  <span className="pw-product-price">{p.price}</span>
                  <span className="pw-product-ret">{p.retailer}</span>
                </div>
                <span className="pw-product-badge">{p.badge}</span>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  )
}
