'use client';

import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components';

export type Payment = {
  id: string;
  stripeId: string;
  fullName: string;
  email: string;
  phone: string | null;
  amount: number;
  currency: string;
  lotId: number | null;
  type: 'donation' | 'lottery';
  createdAt: number;
};

const lotIdToTitle: Record<string, string> = {
  '1': 'David Guetta Gold Record',
  '2': 'Private Dinner with Cathy Guetta in Ibiza',
  '4': 'Weekend in Las Vegas with Ferrari Rentals',
  '5': 'Nativa Interiors Gift Card',
  '6': 'Hennessy Louis XIII Tasting x10',
  '7': 'Three Days Health Retreat in Mexico',
  '8': 'VIP Experience with David Guetta at LIV Beach Party',
  '9': 'Cavallino Grand Weekend Package',
  '10': 'ECU tune for your car of choice',
};

export default function ClientPaymentsDashboard() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | Payment['type']>('all');

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await fetch('/api/admin/payments');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  const filteredPayments = useMemo(() => {
    const all = data?.items ?? [];
    let filtered = all;
    if (activeTab !== 'all') {
      filtered = filtered.filter((p: Payment) => p.type === activeTab);
    }
    if (search.trim()) {
      const term = search.trim().toLowerCase();
      filtered = filtered.filter(
        (p: Payment) =>
          p.fullName.toLowerCase().includes(term) ||
          p.email.toLowerCase().includes(term) ||
          (p.lotId && lotIdToTitle[p.lotId.toString()]?.toLowerCase().includes(term))
      );
    }
    return filtered;
  }, [data, search, activeTab]);

  const getTotal = (type?: Payment['type']) =>
    filteredPayments
      .filter((p: Payment) => !type || p.type === type)
      .reduce((acc: number, p: Payment) => acc + p.amount, 0);

  const badgeForType = (type: Payment['type']) => {
    const base =
      'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset';
    switch (type) {
      case 'donation':
        return (
          <span className={`${base} bg-green-50 text-green-700 ring-green-600/20`}>Donation</span>
        );
      case 'lottery':
        return (
          <span className={`${base} bg-yellow-50 text-yellow-800 ring-yellow-600/20`}>Lottery</span>
        );
    }
  };

  const tabs = [
    { label: 'All', value: 'all' },
    { label: 'Donations', value: 'donation' },
    { label: 'Lotteries', value: 'lottery' },
  ];

  const columns = useMemo<ColumnDef<Payment>[]>(
    () => [
      { header: 'Name', accessorKey: 'fullName' },
      { header: 'Email', accessorKey: 'email' },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: info => `$${(info.getValue<number>() / 100).toFixed(2)}`,
      },
      {
        header: 'Type',
        accessorKey: 'type',
        cell: info => badgeForType(info.getValue<Payment['type']>()),
      },
      {
        header: 'Lot',
        accessorKey: 'lotId',
        cell: info => {
          const id = info.getValue<number | null>();
          return id ? lotIdToTitle[id.toString()] || `Lot #${id}` : '—';
        },
      },
      {
        header: 'Date',
        accessorKey: 'createdAt',
        cell: info => new Date(info.getValue<number>() * 1000).toLocaleString(),
      },
      {
        header: 'Stripe',
        accessorKey: 'stripeId',
        cell: info => (
          <Link
            href={`https://dashboard.stripe.com/payments/${info.getValue()}`}
            className="text-indigo-600 hover:underline"
            target="_blank"
          >
            View
          </Link>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredPayments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="justify-between md:flex">
        <h1 className="mb-6 text-3xl font-bold text-indigo-500">
          Payments Dashboard (Live from Stripe)
        </h1>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="mb-6 inline-flex items-center gap-1 rounded-md bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-200 disabled:opacity-50"
        >
          {isFetching ? (
            <>
              <div className="size-4 animate-spin rounded-full border-2 border-solid border-indigo-600 border-t-transparent"></div>
              Refreshing Payments
            </>
          ) : (
            <>Refresh Payments</>
          )}
        </button>
      </div>

      {isLoading ? (
        <div className="flex h-96 w-full items-center justify-center">
          <div className="size-10 animate-spin rounded-full border-2 border-solid border-indigo-600 border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'Total', value: `$${(getTotal() / 100).toLocaleString()}` },
              { name: 'Donations', value: `$${(getTotal('donation') / 100).toLocaleString()}` },
              { name: 'Lotteries', value: `$${(getTotal('lottery') / 100).toLocaleString()}` },
            ].map(stat => (
              <div
                key={stat.name}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-8 sm:px-6 xl:px-8"
              >
                <dt className="text-sm font-medium text-gray-500">{stat.name}</dt>
                <dd className="w-full flex-none text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="mt-2 sm:mt-0">
              <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                {tabs.map(tab => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value as any)}
                    className={`border-b-2 px-3 py-1 text-sm font-medium ${
                      activeTab === tab.value
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
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
        </>
      )}
    </div>
  );
}
