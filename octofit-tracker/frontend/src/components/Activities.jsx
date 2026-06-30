import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'));
        const data = await response.json();
        if (Array.isArray(data)) {
          setActivities(data);
        } else if (data && Array.isArray(data.results)) {
          setActivities(data.results);
        } else {
          setActivities([]);
        }
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
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id}>
            <strong>{activity.type}</strong> — {activity.duration} min
            {activity.distance ? ` • ${activity.distance} mi` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}
