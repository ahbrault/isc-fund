'use client';

import { useCallback, useEffect, useState } from 'react';
import { Lot } from '@/common';

type Entry = {
  ticket_id: string;
  full_name: string;
  email: string;
  lot_id: number;
};

type Winner = {
  lot_id: number;
  ticket_id: string;
  full_name: string;
  email: string;
  phone?: string;
};

export default function RaffleClient() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [winners, setWinners] = useState<Winner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [lots, setLots] = useState<Lot[]>([]);

  useEffect(() => {
    fetch('/data/lots.json')
      .then(res => res.json())
      .then(setLots)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('raffle_winners');
    if (stored) {
      setWinners(JSON.parse(stored));
    }
  }, []);

  const fetchEntries = useCallback(async () => {
    await fetch('/api/raffle-entries')
      .then(res => res.json())
      .then(setEntries)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const drawWinner = (lotId: number) => {
    const lotEntries = entries.filter(e => e.lot_id === lotId);
    if (!lotEntries.length) return;

    if (winners.find(winner => winner.lot_id === lotId)) return;
    const random = lotEntries[Math.floor(Math.random() * lotEntries.length)];
    const newWinners = [...winners, { ...random, lot_id: lotId }];
    console.log('newWinners', newWinners);

    setWinners(newWinners);
    localStorage.setItem('raffle_winners', JSON.stringify(newWinners));
  };

  const resetWinner = (lotId: number) => {
    const lotEntries = entries.filter(e => e.lot_id === lotId);
    if (!lotEntries.length) return;

    const newWinners = winners.filter(winner => winner.lot_id !== lotId);
    console.log('newWinners', newWinners);

    setWinners(newWinners);
    localStorage.setItem('raffle_winners', JSON.stringify(newWinners));
  };

  return (
    <div className="space-y-8">
      {[7, 8].map(lotId => (
        <div key={lotId} className="rounded-md border border-gray-200 p-4 shadow-sm">
          <h2 className="text-left text-lg font-semibold text-indigo-600">
            Lot {lotId} - {lots.find(lot => lot.id === lotId)?.title}
          </h2>
          {isLoading ? (
            <div className="size-10 animate-spin rounded-full border-2 border-solid border-indigo-600 border-t-transparent"></div>
          ) : (
            <div>
              <p className="mb-2 text-sm text-gray-600">
                {entries.filter(e => e.lot_id === lotId).length} ticket(s) found
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => drawWinner(lotId)}
                  className="mb-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
                >
                  Draw Winner
                </button>
                <button
                  onClick={() => resetWinner(lotId)}
                  className="mb-4 rounded-md bg-gray-500 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
                >
                  Reset
                </button>
              </div>

              <div className="text-sm text-gray-800">
                {winners.find(w => w.lot_id === lotId) ? (
                  <div className="space-y-1">
                    <p>
                      🏆 <strong>{winners.find(w => w.lot_id === lotId)?.full_name}</strong>
                    </p>
                    <p>{winners.find(w => w.lot_id === lotId)?.email}</p>
                    <p>{winners.find(w => w.lot_id === lotId)?.phone}</p>
                    <p>Ticket ID: {winners.find(w => w.lot_id === lotId)?.ticket_id}</p>
                  </div>
                ) : (
                  <p className="italic text-gray-400">No winner drawn.</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
