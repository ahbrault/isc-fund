'use client';

import { Table, flexRender } from '@tanstack/react-table';
import { ArrowUpIcon, ArrowDownIcon, ArrowsUpDownIcon } from '@heroicons/react/20/solid';

interface DataTableProps<T extends object> {
  table: Table<T>;
  isLoading?: boolean;
}

export default function DataTable<T extends object>({ table, isLoading }: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-2 border-solid border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md bg-white shadow-sm ring-1 ring-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
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
  );
}
