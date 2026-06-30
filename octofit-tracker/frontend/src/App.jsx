import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5">OctoFit Tracker</h1>
        <p className="text-muted">
          Connect the React presentation tier to the backend API using Vite environment variables.
          {codespaceName ? ` Using the Codespaces host ${codespaceName}.` : ' Falling back to localhost.'}
        </p>
        <p className="small text-secondary">
          Define VITE_CODESPACE_NAME in .env.local for Codespaces, or leave it unset to use http://localhost:8000.
        </p>
        <nav className="nav gap-3">
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/">
            Users
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/teams">
            Teams
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/activities">
            Activities
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/leaderboard">
            Leaderboard
          </NavLink>
          <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/workouts">
            Workouts
          </NavLink>
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
  );
}

export default App;
