'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Lot } from '@/common';

type Entry = {
  ticket_id: string;
  full_name: string;
  email: string;
  phone?: string;
  lot_id: number;
};

type Winner = Entry;

export default function RaffleClient() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [lots, setLots] = useState<Lot[]>([]);

  useEffect(() => {
    fetch('/data/lots.json')
      .then(res => res.json())
      .then(setLots)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('raffle_winners');
    if (stored) setWinners(JSON.parse(stored));
  }, []);

  const {
    data: entries,
    isLoading,
    refetch,
    isFetching,
  } = useQuery<Entry[]>({
    queryKey: ['raffleEntries'],
    queryFn: async () => {
      const res = await fetch('/api/admin/raffle-entries');
      if (!res.ok) throw new Error('Failed to fetch raffle entries');
      return res.json();
    },
  });

  const drawWinner = (lotId: number) => {
    const lotEntries = entries?.filter(e => e.lot_id === lotId) ?? [];
    if (!lotEntries.length || winners.find(w => w.lot_id === lotId)) return;

    const winner = lotEntries[Math.floor(Math.random() * lotEntries.length)];
    const updated = [...winners, winner];
    setWinners(updated);
    localStorage.setItem('raffle_winners', JSON.stringify(updated));
  };

  const resetWinner = (lotId: number) => {
    const updated = winners.filter(w => w.lot_id !== lotId);
    setWinners(updated);
    localStorage.setItem('raffle_winners', JSON.stringify(updated));
  };

  if (isLoading || !entries) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-2 border-solid border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex justify-between">
        <h1 className="mb-6 text-3xl font-bold text-indigo-500">Lottery Raffle Winners</h1>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="mb-6 inline-flex items-center gap-1 rounded-md bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-200 disabled:opacity-50"
        >
          {isFetching ? (
            <>
              <div className="size-4 animate-spin rounded-full border-2 border-solid border-indigo-600 border-t-transparent"></div>
              Refreshing Tickets
            </>
          ) : (
            <>Refresh Tickets</>
          )}
        </button>
      </div>
      <div className="space-y-8">
        {[7, 8].map(lotId => {
          const lotTitle = lots.find(lot => lot.id === lotId)?.title ?? '';
          const ticketCount = entries.filter(e => e.lot_id === lotId).length;
          const winner = winners.find(w => w.lot_id === lotId);

          return (
            <div key={lotId} className="rounded-md border border-gray-200 p-4 shadow-sm">
              <h2 className="text-left text-lg font-semibold text-indigo-600">
                Lot {lotId} – {lotTitle}
              </h2>

              <p className="mb-2 text-sm text-gray-600">{ticketCount} ticket(s) found</p>

              <div className="flex gap-2">
                <button
                  onClick={() => drawWinner(lotId)}
                  className="mb-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700"
                >
                  Draw Winner
                </button>
                <button
                  onClick={() => resetWinner(lotId)}
                  className="mb-4 rounded-md bg-gray-500 px-3 py-1.5 text-sm text-white hover:bg-gray-700"
                >
                  Reset
                </button>
              </div>

              <div className="text-sm text-gray-800">
                {winner ? (
                  <div className="space-y-1">
                    <p>
                      🏆 <strong>{winner.full_name}</strong>
                    </p>
                    <p>{winner.email}</p>
                    <p>{winner.phone}</p>
                    <p>Ticket ID: {winner.ticket_id}</p>
                  </div>
                ) : (
                  <p className="italic text-gray-400">No winner drawn.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
