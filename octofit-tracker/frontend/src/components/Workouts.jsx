import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setError('');
        const response = await fetch(buildApiUrl('workouts'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const nextWorkouts = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : Array.isArray(data?.items)
              ? data.items
              : [];

        setWorkouts(nextWorkouts);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {workouts.length === 0 ? (
        <p className="text-muted">No workouts available yet.</p>
      ) : (
        <ul className="list-group">
          {workouts.map((workout) => (
            <li className="list-group-item" key={workout._id || workout.id || workout.title}>
              <strong>{workout.title}</strong> — {workout.difficulty} • {workout.duration} min
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
