import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container py-4">
        <header className="mb-4">
          <h1>OctoFit Tracker</h1>
          <p className="text-muted">
            Connect to the backend API using Vite environment variables. Define{' '}
            <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces, or leave it unset for localhost.
          </p>
          <nav className="nav gap-3">
            <Link className="nav-link" to="/">Users</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
