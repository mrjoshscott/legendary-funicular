import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'));
        const data = await response.json();
        if (Array.isArray(data)) {
          setTeams(data);
        } else if (data && Array.isArray(data.results)) {
          setTeams(data.results);
        } else {
          setTeams([]);
        }
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id || team.id}>
            <strong>{team.name}</strong> — {team.sport || 'Team'}
          </li>
        ))}
      </ul>
    </section>
  );
}
