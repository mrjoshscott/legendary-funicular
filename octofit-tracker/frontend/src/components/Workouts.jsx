import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('workouts'));
        const data = await response.json();
        if (Array.isArray(data)) {
          setWorkouts(data);
        } else if (data && Array.isArray(data.results)) {
          setWorkouts(data.results);
        } else {
          setWorkouts([]);
        }
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
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.id}>
            <strong>{workout.title}</strong> — {workout.difficulty} • {workout.duration} min
          </li>
        ))}
      </ul>
    </section>
  );
}
