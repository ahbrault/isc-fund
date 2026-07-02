'use client';

import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import DeleteBidModal from './DeleteBidModal';
import { DataTable } from '@/components';

export type AuctionBid = {
  id: string;
  lotId: number;
  lotTitle: string;
  fullName: string;
  email: string;
  phone?: string;
  amount: number;
  archived: boolean;
  createdAt: string;
};

// Badge colors cycle by lot id so any catalogue gets a stable color.
const badgePalette = [
  'bg-red-50 text-red-700 ring-red-600/10',
  'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
  'bg-green-50 text-green-700 ring-green-600/20',
  'bg-blue-50 text-blue-700 ring-blue-700/10',
  'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
  'bg-purple-50 text-purple-700 ring-purple-700/10',
  'bg-pink-50 text-pink-700 ring-pink-700/10',
];

const badgeColor = (id: number) => badgePalette[id % badgePalette.length];

export default function AdminBidsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState('');
  const [activeLot, setActiveLot] = useState<'all' | number>('all');
  const [scope, setScope] = useState<'active' | 'archived'>('active');
  const [selectedBid, setSelectedBid] = useState<AuctionBid | null>(null);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['bids'],
    queryFn: async (): Promise<{ items: AuctionBid[] }> => {
      const res = await fetch('/api/admin/bids');
      if (!res.ok) throw new Error('Failed to fetch bids');
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/bids/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete bid');
      return res.json();
    },
    onSuccess: () => refetch(),
  });

  // Derive the lot tabs from the bids actually present (id -> title),
  // so the filter always matches the current catalogue.
  // Bids belonging to the currently selected scope (active vs archived).
  const scopedBids = useMemo(
    () => (data?.items ?? []).filter(bid => (scope === 'archived' ? bid.archived : !bid.archived)),
    [data, scope]
  );

  const lots = useMemo<Record<number, string>>(() => {
    const map: Record<number, string> = {};
    for (const bid of scopedBids) {
      if (!map[bid.lotId]) map[bid.lotId] = bid.lotTitle;
    }
    return map;
  }, [scopedBids]);

  const filteredBids = useMemo(() => {
    let filtered = scopedBids;
    if (activeLot !== 'all') {
      filtered = filtered.filter(bid => bid.lotId === activeLot);
    }
    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        bid =>
          bid.fullName.toLowerCase().includes(term) ||
          bid.email.toLowerCase().includes(term) ||
          bid.lotTitle.toLowerCase().includes(term)
      );
    }
    return filtered;
  }, [scopedBids, search, activeLot]);

  const columns = useMemo<ColumnDef<AuctionBid>[]>(
    () => [
      {
        header: 'Date',
        accessorKey: 'createdAt',
        cell: info => new Date(info.getValue<string>()).toLocaleString(),
      },
      {
        header: 'Lot',
        accessorKey: 'lotId',
        cell: info => {
          const id = info.getValue<number>();
          const title = info.row.original.lotTitle || `Lot #${id}`;
          return (
            <span
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${badgeColor(id)}`}
            >
              {title}
            </span>
          );
        },
      },
      { header: 'Name', accessorKey: 'fullName' },
      { header: 'Email', accessorKey: 'email' },
      { header: 'Phone', accessorKey: 'phone' },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: info => `$${info.getValue<number>().toLocaleString()}`,
      },
      {
        header: ' ',
        enableSorting: false,
        cell: info => (
          <button
            onClick={() => setSelectedBid(info.row.original)}
            className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200"
          >
            Delete
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredBids,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <DeleteBidModal
        open={!!selectedBid}
        fullName={selectedBid?.fullName || ''}
        onClose={() => setSelectedBid(null)}
        onConfirm={() => {
          if (selectedBid) {
            deleteMutation.mutate(selectedBid.id);
            setSelectedBid(null);
          }
        }}
      />

      <div className="mb-6 items-center justify-between md:flex">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-indigo-600">Auction Bids</h1>
          <div className="inline-flex rounded-md border border-gray-200 p-0.5 text-sm">
            {(['active', 'archived'] as const).map(s => (
              <button
                key={s}
                onClick={() => {
                  setScope(s);
                  setActiveLot('all');
                }}
                className={`rounded px-3 py-1 font-medium capitalize ${
                  scope === s ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center gap-1 rounded-md bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-200 disabled:opacity-50"
        >
          {isFetching ? (
            <>
              <div className="size-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
              Refreshing Bids
            </>
          ) : (
            'Refresh Bids'
          )}
        </button>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="mt-2 sm:mt-0">
          <nav className="-mb-px flex flex-wrap gap-2" aria-label="Tabs">
            <button
              onClick={() => setActiveLot('all')}
              className={`border-b-2 px-3 py-1 text-sm font-medium ${
                activeLot === 'all'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              All
            </button>
            {Object.entries(lots).map(([id, title]) => (
              <button
                key={id}
                onClick={() => setActiveLot(Number(id))}
                className={`border-b-2 px-3 py-1 text-sm font-medium ${
                  activeLot === Number(id)
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {title}
              </button>
            ))}
          </nav>
        </div>
        <input
          type="text"
          placeholder="Search name, email or lot..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <DataTable table={table} isLoading={isLoading} />
    </div>
  );
}
