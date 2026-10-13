// frontend/src/App.tsx
import { useEffect, useState } from 'react';
import { fetchApi } from './api/client';
import Addition from './components/Addition';
interface StatusPayload {
  status: string;
  timestamp: string;
}

export default function App() {
  const [data, setData] = useState<StatusPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApi<StatusPayload>('/status')
      .then((res) => setData(res))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Connecting to backend...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  
  return (
    <main>
      <h1>NestJS + React Connected</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Addition></Addition>
    </main>
  );
}