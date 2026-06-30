import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        setError('');
        const response = await fetch(buildApiUrl('teams'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const nextTeams = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : Array.isArray(data?.items)
              ? data.items
              : [];

        setTeams(nextTeams);
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
      {teams.length === 0 ? (
        <p className="text-muted">No teams available yet.</p>
      ) : (
        <ul className="list-group">
          {teams.map((team) => (
            <li className="list-group-item" key={team._id || team.id || team.name}>
              <strong>{team.name}</strong> — {team.sport || 'Team'}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
