'use client';

import { useEffect, useState, FormEvent } from 'react';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
const LOCAL_STORAGE_KEY = 'admin_authenticated';

export default function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  if (!authenticated) {
    return (
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-20 max-w-sm space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md"
      >
        <h2 className="text-xl font-semibold text-indigo-600">Admin Access</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full rounded-md border px-3 py-2 text-sm outline-indigo-600"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 py-2 text-sm text-white hover:bg-indigo-700"
        >
          Access Admin Area
        </button>
      </form>
    );
  }

  return <>{children}</>;
}
