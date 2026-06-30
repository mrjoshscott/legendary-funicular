import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setError('');
        const response = await fetch(buildApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const nextEntries = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : Array.isArray(data?.items)
              ? data.items
              : [];

        setEntries(nextEntries);
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
      {entries.length === 0 ? (
        <p className="text-muted">No leaderboard entries available yet.</p>
      ) : (
        <ul className="list-group">
          {entries.map((entry) => (
            <li className="list-group-item" key={entry._id || entry.id || `${entry.rank}-${entry.userId?.name || 'unknown'}`}>
              <strong>#{entry.rank}</strong> — {entry.userId?.name || 'Unknown'} with {entry.points} pts
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
