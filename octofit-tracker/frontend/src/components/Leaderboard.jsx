import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        const data = await response.json();
        if (Array.isArray(data)) {
          setEntries(data);
        } else if (data && Array.isArray(data.results)) {
          setEntries(data.results);
        } else {
          setEntries([]);
        }
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <ul className="list-group">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.id}>
            <strong>#{entry.rank}</strong> — {entry.userId?.name || 'Unknown'} with {entry.points} pts
          </li>
        ))}
      </ul>
    </section>
  );
}
