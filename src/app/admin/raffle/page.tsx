'use client';
import { FormEvent, useEffect, useState } from 'react';
import RaffleClient from './RaffleClient';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_RAFFLE_PASSWORD;

export default function RafflePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = password === ADMIN_PASSWORD;

    if (valid) {
      setAuthenticated(true);
    } else {
      alert('Wrong password');
    }
  };

  useEffect(() => {
    console.log('authenticated', authenticated);
  }, [authenticated]);

  // Auth form
  if (!authenticated) {
    return (
      <form
        className="mx-auto mt-10 max-w-sm space-y-4 rounded-lg border border-gray-200 p-6 shadow-md"
        onSubmit={handleSubmit}
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

  // Content if authenticated
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Admin – Lottery Raffle Winners</h1>
      <RaffleClient />
    </div>
  );
}
