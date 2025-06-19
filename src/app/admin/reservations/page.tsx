'use client';

import { useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { DataTable } from '@/components';
import { ReservationDrawer } from './ReservationDrawer';

type ReservationData = {
  id: string;
  createdAt: string;
  eventName: string;
  totalSeats: number;
  paidSeats: number;
  status: 'PENDING' | 'COMPLETE';
  host: {
    name: string;
    email: string | null;
    companyName: string | null;
  } | null;
  guests: {
    name: string;
    paymentStatus: string;
  }[];
};

export default function AdminReservationsPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedReservation, setSelectedReservation] = useState<ReservationData | null>(null);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['reservations'],
    queryFn: async (): Promise<{ items: ReservationData[] }> => {
      const res = await fetch('/api/admin/reservations');
      if (!res.ok) throw new Error('Failed to fetch reservations');
      return res.json();
    },
  });

  const reservations = data?.items ?? [];

  // Calculate stats using useMemo for performance
  const stats = useMemo(() => {
    const totalReservations = reservations.length;
    const seatsConfirmed = reservations.reduce((acc, res) => acc + res.paidSeats, 0);
    const totalRevenue = seatsConfirmed * 1000;

    return [
      { name: 'Total Tables', value: totalReservations },
      { name: 'Seats Confirmed (Paid)', value: seatsConfirmed },
      {
        name: 'Total Revenue',
        value: `${totalRevenue.toLocaleString('fr-FR')} €`,
      },
    ];
  }, [reservations]);

  // Define columns for our TanStack Table
  const columns = useMemo<ColumnDef<ReservationData>[]>(
    () => [
      {
        header: 'Host',
        accessorKey: 'host',
        cell: info => {
          const host = info.getValue<{
            name: string;
            email: string | null;
            companyName: string | null;
          }>();
          return (
            <div>
              <div className="font-bold text-gray-900">{host?.name}</div>
              <div className="text-gray-600">{host?.email}</div>
              {host?.companyName && (
                <div className="text-xs text-indigo-600">{host.companyName}</div>
              )}
            </div>
          );
        },
      },
      {
        header: 'Seats',
        accessorKey: 'paidSeats',
        cell: info => {
          const row = info.row.original;
          const isComplete = row.paidSeats === row.totalSeats;
          return (
            <span className={`font-semibold ${isComplete ? 'text-green-600' : 'text-yellow-700'}`}>
              {row.paidSeats} / {row.totalSeats} paid
            </span>
          );
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: info => {
          const status = info.getValue<'PENDING' | 'COMPLETE'>();
          const baseClasses =
            'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset';
          if (status === 'COMPLETE') {
            return (
              <span className={`${baseClasses} bg-green-50 text-green-700 ring-green-600/20`}>
                Complete
              </span>
            );
          }
          return (
            <span className={`${baseClasses} bg-yellow-50 text-yellow-800 ring-yellow-600/20`}>
              Pending
            </span>
          );
        },
      },
      {
        header: 'Reservation Date',
        accessorKey: 'createdAt',
        cell: info => new Date(info.getValue<string>()).toLocaleString(),
      },
      {
        id: 'actions',
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <button
            onClick={() => setSelectedReservation(row.original)}
            className="text-sm font-semibold text-indigo-600"
          >
            View<span className="sr-only">, {row.original.host?.name}</span>
          </button>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: reservations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <ReservationDrawer
        reservation={selectedReservation}
        onClose={() => setSelectedReservation(null)}
      />

      <div className="justify-between md:flex">
        <h1 className="mb-6 text-3xl font-bold text-indigo-500">Table Reservations</h1>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="mb-6 inline-flex items-center gap-1 rounded-md bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-200 disabled:opacity-50"
        >
          {isFetching ? (
            <>
              <div className="size-4 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent"></div>
              Refreshing Reservations
            </>
          ) : (
            'Refresh Reservations'
          )}
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(stat => (
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

      <DataTable table={table} isLoading={isLoading} />
    </div>
  );
}
