import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        setError('');
        const response = await fetch(buildApiUrl('users'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        const nextUsers = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : Array.isArray(data?.items)
              ? data.items
              : [];

        setUsers(nextUsers);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      {users.length === 0 ? (
        <p className="text-muted">No users available yet.</p>
      ) : (
        <ul className="list-group">
          {users.map((user) => (
            <li className="list-group-item" key={user._id || user.id || user.email}>
              <strong>{user.name}</strong> — {user.email} ({user.role})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
