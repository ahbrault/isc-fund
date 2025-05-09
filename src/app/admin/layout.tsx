'use client';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ReactQueryProvider from './ReactQueryProvider';
import AdminAuthGate from './AdminAuthGate';
import Image from 'next/image';

const navigationItems = [
  { name: 'Payments', href: '/admin/payments', startsWith: '/admin/payments' },
  { name: 'Bids', href: '/admin/bids', startsWith: '/admin/bids' },
  { name: 'Raffle', href: '/admin/raffle', startsWith: '/admin/raffle' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ReactQueryProvider>
      <AdminAuthGate>
        <div className="min-h-full">
          <Disclosure as="nav" className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="flex shrink-0 items-center">
                    <Link href="/admin">
                      <Image
                        height={60}
                        width={100}
                        className="block h-8 w-auto lg:hidden"
                        src="/logo-icon-indigo.svg"
                        alt="ISC Fund"
                      />
                      <Image
                        height={60}
                        width={100}
                        className="hidden h-8 w-auto lg:block"
                        src="/logo-icon-indigo.svg"
                        alt="ISC Fund"
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                    {navigationItems.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          pathname?.startsWith(item.startsWith)
                            ? 'border-indigo-500 text-gray-900'
                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                          'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      localStorage.removeItem('admin_authenticated');
                      location.reload();
                    }}
                    className="ml-4 rounded-md bg-gray-100 px-3 py-1 text-sm text-indigo-500 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
                <div className="-mr-2 flex items-center sm:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  </DisclosureButton>
                </div>
              </div>
            </div>

            <DisclosurePanel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigationItems.map(item => (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classNames(
                      pathname?.startsWith(item.startsWith)
                        ? 'border-indigo-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                      'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>

          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </AdminAuthGate>
    </ReactQueryProvider>
  );
}
