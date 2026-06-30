import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        setError('');
        const response = await fetch(buildApiUrl('activities'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const nextActivities = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : Array.isArray(data?.items)
              ? data.items
              : [];

        setActivities(nextActivities);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {activities.length === 0 ? (
        <p className="text-muted">No activities available yet.</p>
      ) : (
        <ul className="list-group">
          {activities.map((activity) => (
            <li className="list-group-item" key={activity._id || activity.id || `${activity.type}-${activity.duration}`}>
              <strong>{activity.type}</strong> — {activity.duration} min
              {activity.distance ? ` • ${activity.distance} mi` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
