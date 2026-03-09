# ravi-app

React + Supabase + Netlify starter. Auth wired up out of the box.

## Stack

- **Frontend**: React 18 + Vite
- **Auth & DB**: Supabase
- **Routing**: React Router v6
- **Deploy**: Netlify

---

## Get it live in ~30 minutes

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) → New project
2. Once created, go to **Settings → API**
3. Copy your **Project URL** and **anon public** key

```bash
cp .env.example .env.local
# Edit .env.local and paste your values
```

### 3. Run locally

```bash
npm run dev
```

Visit `http://localhost:5173` — sign up, log in, done.

### 4. Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
gh repo create ravi-app --public --source=. --push
# or manually create repo on github.com and push
```

### 5. Deploy to Netlify

**Option A — Netlify UI (easiest):**
1. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
2. Pick your GitHub repo
3. Build command: `npm run build` | Publish dir: `dist`
4. Go to **Site settings → Environment variables** and add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Trigger a redeploy → get your live URL ✅

**Option B — Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify env:set VITE_SUPABASE_URL "https://xxx.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "your-anon-key"
netlify deploy --prod
```

---

## Project structure

```
src/
├── components/
│   ├── AuthProvider.jsx   # Auth context (wraps whole app)
│   └── ProtectedRoute.jsx # Redirects to /login if not authed
├── hooks/
│   └── useAuth.js         # signIn / signUp / signOut + session state
├── lib/
│   └── supabase.js        # Supabase client (reads from env)
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── Dashboard.jsx      # Protected — your app lives here
├── App.jsx                # Routes
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## Adding database queries

```js
import { supabase } from '../lib/supabase'

// Example: fetch rows from a 'posts' table
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .order('created_at', { ascending: false })
```

Create your tables in the Supabase dashboard under **Table Editor**.
