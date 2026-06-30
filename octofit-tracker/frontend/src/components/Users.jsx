import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'));
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data && Array.isArray(data.results)) {
          setUsers(data.results);
        } else {
          setUsers([]);
        }
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
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.id}>
            <strong>{user.name}</strong> — {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </section>
  );
}
