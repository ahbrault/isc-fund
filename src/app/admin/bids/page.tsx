'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowUpIcon, ArrowDownIcon, ArrowsUpDownIcon } from '@heroicons/react/20/solid';
import DeleteBidModal from './DeleteBidModal';

export type AuctionBid = {
  id: string;
  lotId: number;
  lotTitle: string;
  fullName: string;
  email: string;
  phone?: string;
  amount: number;
  createdAt: string;
};

const lots: Record<number, string> = {
  1: 'David Guetta Gold Record',
  2: 'Private Dinner with Cathy Guetta in Ibiza',
  4: 'Weekend in Las Vegas with Ferrari Rentals',
  5: 'Nativa Interiors Gift Card',
  6: 'Hennessy Louis XIII Tasting x10',
  9: 'Cavallino Grand Weekend Package',
  10: 'ECU tune for your car of choice',
};

const lotBadgeColors: Record<number, string> = {
  1: 'bg-red-50 text-red-700 ring-red-600/10',
  2: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
  4: 'bg-green-50 text-green-700 ring-green-600/20',
  5: 'bg-blue-50 text-blue-700 ring-blue-700/10',
  6: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
  9: 'bg-purple-50 text-purple-700 ring-purple-700/10',
  10: 'bg-pink-50 text-pink-700 ring-pink-700/10',
};

export default function AdminBidsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState('');
  const [activeLot, setActiveLot] = useState<'all' | number>('all');
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

  const filteredBids = useMemo(() => {
    const all = data?.items ?? [];
    let filtered = all;
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
  }, [data, search, activeLot]);

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
          return (
            <span
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${lotBadgeColors[id]}`}
            >
              {lots[id] || `Lot #${id}`}
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
    <div className="mx-auto max-w-6xl px-6 py-10">
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
        <h1 className="text-3xl font-bold text-indigo-600">Auction Bids</h1>
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

      {isLoading ? (
        <div className="flex h-96 w-full items-center justify-center">
          <div className="size-10 animate-spin rounded-full border-2 border-solid border-indigo-600 border-t-transparent"></div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md bg-white shadow-sm ring-1 ring-gray-200">
          <table className="min-w-full divide-y divide-gray-300 text-sm">
            <thead className="bg-gray-100">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    const sorted = header.column.getIsSorted();
                    return (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="group cursor-pointer px-4 py-3 text-left font-semibold text-gray-900"
                      >
                        <div className="inline-flex items-center gap-1 text-gray-900">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {sorted === 'asc' ? (
                            <ArrowUpIcon className="h-4 w-4 fill-gray-900" />
                          ) : sorted === 'desc' ? (
                            <ArrowDownIcon className="h-4 w-4 fill-gray-900" />
                          ) : (
                            <ArrowsUpDownIcon className="invisible h-4 w-4 fill-gray-500 group-hover:visible" />
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
