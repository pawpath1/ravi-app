import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Onboarding.css'

const BREEDS = [
  'Golden Retriever', 'Labrador Retriever', 'French Bulldog', 'German Shepherd',
  'Poodle', 'Beagle', 'Rottweiler', 'Yorkshire Terrier', 'Dachshund', 'Boxer',
  'Border Collie', 'Siberian Husky', 'Cavalier King Charles Spaniel', 'Shih Tzu',
  'Maltese', 'Jack Russell Terrier', 'Staffordshire Bull Terrier', 'Greyhound',
  'Australian Shepherd', 'Kelpie', 'Blue Heeler', 'Spoodle', 'Cavoodle',
  'Labradoodle', 'Groodle', 'Mixed Breed / Not Sure',
]

const CONCERNS = [
  { id: 'toilet', emoji: '🚽', label: 'Toilet / house training' },
  { id: 'biting', emoji: '🦷', label: 'Puppy biting and mouthing' },
  { id: 'sleep',  emoji: '😴', label: 'Sleep and settling' },
  { id: 'feeding', emoji: '🍖', label: 'Feeding and nutrition' },
  { id: 'vet',   emoji: '🏥', label: 'I need to find a vet' },
]

const TOTAL_STEPS = 5

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [breedSearch, setBreedSearch] = useState('')
  const [showBreedList, setShowBreedList] = useState(false)

  const [form, setForm] = useState({
    // Step 2
    fullName: '', email: '', mobile: '', suburb: '',
    // Step 3
    dogName: '', ageValue: '', ageUnit: 'weeks', breed: '', firstTime: null,
    // Step 4
    concern: '',
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const filteredBreeds = BREEDS.filter(b =>
    b.toLowerCase().includes(breedSearch.toLowerCase())
  )

  const canContinue = () => {
    if (step === 2) return form.fullName && form.email && form.mobile && form.suburb
    if (step === 3) return form.dogName && form.ageValue && form.breed && form.firstTime !== null
    if (step === 4) return form.concern
    return true
  }

  const next = () => {
    if (step < TOTAL_STEPS) setStep(s => s + 1)
    else navigate('/dashboard')
  }

  const back = () => setStep(s => s - 1)

  return (
    <div className="ob-root">
      <div className="ob-card">

        {/* Logo */}
        <div className="ob-logo">
          <span className="ob-logo-paw">🐾</span>
          <span className="ob-logo-text">PawPath</span>
        </div>

        {/* Progress bar */}
        {step > 1 && step < 5 && (
          <div className="ob-progress-wrap">
            <div className="ob-progress-bar">
              <div
                className="ob-progress-fill"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>
            <span className="ob-progress-label">Step {step - 1} of 3</span>
          </div>
        )}

        {/* ── Screen 1: Welcome ── */}
        {step === 1 && (
          <div className="ob-screen ob-welcome" key="s1">
            <div className="ob-welcome-art">
              <div className="ob-art-circle ob-art-circle--1"/>
              <div className="ob-art-circle ob-art-circle--2"/>
              <span className="ob-art-emoji">🐶</span>
            </div>
            <h1 className="ob-h1">Raise a happy,<br/>healthy dog.</h1>
            <p className="ob-sub">PawPath gives Australian dog owners week-by-week guidance, vet-approved advice, and emergency support — all in one place.</p>
            <button className="ob-btn-primary" onClick={next}>Get Started</button>
            <button className="ob-btn-ghost" onClick={() => navigate('/login')}>Already have an account? Sign in</button>
          </div>
        )}

        {/* ── Screen 2: About You ── */}
        {step === 2 && (
          <div className="ob-screen" key="s2">
            <p className="ob-eyebrow">About you</p>
            <h2 className="ob-h2">Let's get to know you</h2>
            <p className="ob-step-sub">Takes about 45 seconds.</p>

            <div className="ob-fields">
              <div className="ob-field">
                <label className="ob-label">Full name</label>
                <input
                  className="ob-input"
                  placeholder="Sarah Johnson"
                  value={form.fullName}
                  onChange={e => set('fullName', e.target.value)}
                  autoFocus
                />
              </div>
              <div className="ob-field">
                <label className="ob-label">Email address</label>
                <input
                  className="ob-input"
                  type="email"
                  placeholder="sarah@email.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                />
              </div>
              <div className="ob-field">
                <label className="ob-label">Mobile number</label>
                <input
                  className="ob-input"
                  type="tel"
                  placeholder="0412 345 678"
                  value={form.mobile}
                  onChange={e => set('mobile', e.target.value)}
                />
                <span className="ob-hint">For urgent health alerts and booking confirmations</span>
              </div>
              <div className="ob-field">
                <label className="ob-label">Suburb</label>
                <input
                  className="ob-input"
                  placeholder="Bondi Beach, NSW"
                  value={form.suburb}
                  onChange={e => set('suburb', e.target.value)}
                />
                <span className="ob-hint">Used to find local vets and services</span>
              </div>
            </div>

            <div className="ob-nav">
              <button className="ob-btn-back" onClick={back}>← Back</button>
              <button className="ob-btn-primary" onClick={next} disabled={!canContinue()}>Continue</button>
            </div>
          </div>
        )}

        {/* ── Screen 3: About Your Dog ── */}
        {step === 3 && (
          <div className="ob-screen" key="s3">
            <p className="ob-eyebrow">About your dog</p>
            <h2 className="ob-h2">Tell us about your<br/>furry friend</h2>
            <p className="ob-step-sub">Takes about 60 seconds.</p>

            <div className="ob-fields">
              <div className="ob-field">
                <label className="ob-label">Dog's name</label>
                <input
                  className="ob-input"
                  placeholder="Buddy"
                  value={form.dogName}
                  onChange={e => set('dogName', e.target.value)}
                  autoFocus
                />
              </div>

              <div className="ob-field">
                <label className="ob-label">How old are they?</label>
                <div className="ob-age-row">
                  <input
                    className="ob-input ob-age-num"
                    type="number"
                    min="1"
                    placeholder="10"
                    value={form.ageValue}
                    onChange={e => set('ageValue', e.target.value)}
                  />
                  <div className="ob-unit-toggle">
                    {['weeks', 'months', 'years'].map(u => (
                      <button
                        key={u}
                        className={`ob-unit-btn ${form.ageUnit === u ? 'active' : ''}`}
                        onClick={() => set('ageUnit', u)}
                        type="button"
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="ob-field ob-breed-field">
                <label className="ob-label">Breed</label>
                <input
                  className="ob-input"
                  placeholder="Search breed…"
                  value={breedSearch || form.breed}
                  onChange={e => {
                    setBreedSearch(e.target.value)
                    set('breed', '')
                    setShowBreedList(true)
                  }}
                  onFocus={() => setShowBreedList(true)}
                />
                {showBreedList && filteredBreeds.length > 0 && !form.breed && (
                  <ul className="ob-breed-list">
                    {filteredBreeds.slice(0, 6).map(b => (
                      <li
                        key={b}
                        className="ob-breed-item"
                        onClick={() => {
                          set('breed', b)
                          setBreedSearch(b)
                          setShowBreedList(false)
                        }}
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="ob-field">
                <label className="ob-label">First-time dog owner?</label>
                <div className="ob-toggle-row">
                  <button
                    className={`ob-toggle-btn ${form.firstTime === true ? 'active' : ''}`}
                    onClick={() => set('firstTime', true)}
                    type="button"
                  >
                    Yes, first time 🐾
                  </button>
                  <button
                    className={`ob-toggle-btn ${form.firstTime === false ? 'active' : ''}`}
                    onClick={() => set('firstTime', false)}
                    type="button"
                  >
                    I've had dogs before
                  </button>
                </div>
              </div>
            </div>

            <div className="ob-nav">
              <button className="ob-btn-back" onClick={back}>← Back</button>
              <button className="ob-btn-primary" onClick={next} disabled={!canContinue()}>Continue</button>
            </div>
          </div>
        )}

        {/* ── Screen 4: Current Challenge ── */}
        {step === 4 && (
          <div className="ob-screen" key="s4">
            <p className="ob-eyebrow">Your situation</p>
            <h2 className="ob-h2">What's your biggest<br/>concern right now?</h2>
            <p className="ob-step-sub">We'll prioritise this in {form.dogName || 'your dog'}'s plan.</p>

            <div className="ob-concerns">
              {CONCERNS.map(c => (
                <button
                  key={c.id}
                  className={`ob-concern-btn ${form.concern === c.id ? 'active' : ''}`}
                  onClick={() => set('concern', c.id)}
                  type="button"
                >
                  <span className="ob-concern-emoji">{c.emoji}</span>
                  <span className="ob-concern-label">{c.label}</span>
                  {form.concern === c.id && <span className="ob-concern-check">✓</span>}
                </button>
              ))}
            </div>

            <div className="ob-nav">
              <button className="ob-btn-back" onClick={back}>← Back</button>
              <button className="ob-btn-primary" onClick={next} disabled={!canContinue()}>
                Create {form.dogName ? `${form.dogName}'s` : 'My'} Plan →
              </button>
            </div>
          </div>
        )}

        {/* ── Screen 5: Plan Ready ── */}
        {step === 5 && (
          <div className="ob-screen ob-ready" key="s5">
            <div className="ob-ready-icon">🎉</div>
            <h2 className="ob-h2 ob-ready-h2">
              {form.dogName ? `${form.dogName}'s` : 'Your'} plan<br/>is ready!
            </h2>
            <p className="ob-sub ob-ready-sub">
              Here's what we've prepared based on everything you told us.
            </p>

            <div className="ob-ready-list">
              <div className="ob-ready-item">
                <span className="ob-ready-check">✅</span>
                <span>This week's priority tasks for {form.dogName || 'your pup'}</span>
              </div>
              <div className="ob-ready-item">
                <span className="ob-ready-check">✅</span>
                <span>What to expect as they grow, week by week</span>
              </div>
              <div className="ob-ready-item">
                <span className="ob-ready-check">✅</span>
                <span>Emergency vet information near {form.suburb || 'you'}</span>
              </div>
              <div className="ob-ready-item">
                <span className="ob-ready-check">✅</span>
                <span>Weekly progress updates by email</span>
              </div>
            </div>

            <button className="ob-btn-primary ob-ready-cta" onClick={next}>
              View {form.dogName ? `${form.dogName}'s` : 'My'} Plan →
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
