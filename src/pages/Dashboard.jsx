import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../components/AuthProvider'

export default function Dashboard() {
  const { user, signOut } = useAuthContext()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Ravi App</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleSignOut} className="btn-secondary">
            Sign out
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="welcome-card">
          <h2>You're in! 🎉</h2>
          <p>Your stack is live. Start building here.</p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Auth</h3>
            <p>Supabase auth is wired up. Users can sign up, log in, and log out.</p>
          </div>
          <div className="info-card">
            <h3>Database</h3>
            <p>Add tables in your Supabase dashboard and query them via the <code>supabase</code> client in <code>src/lib/supabase.js</code>.</p>
          </div>
          <div className="info-card">
            <h3>Routing</h3>
            <p>React Router is set up. Protected routes redirect unauthenticated users to <code>/login</code>.</p>
          </div>
          <div className="info-card">
            <h3>Deploy</h3>
            <p>Push to GitHub, then connect the repo on Netlify. Set your env vars in Netlify's dashboard.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
