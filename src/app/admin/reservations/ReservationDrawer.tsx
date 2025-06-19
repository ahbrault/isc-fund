'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import Stripe from 'stripe';

function StripePaymentDetails({ paymentIntentId }: { paymentIntentId: string }) {
  const { data: paymentIntent, isPending } = useQuery({
    queryKey: ['stripePayment', paymentIntentId],
    queryFn: async (): Promise<Stripe.PaymentIntent> => {
      const res = await fetch(`/api/admin/stripe-payment/${paymentIntentId}`);
      if (!res.ok) throw new Error('Failed to fetch payment details');
      return res.json();
    },
    enabled: !!paymentIntentId,
  });

  if (isPending)
    return (
      <div className="mt-2 border-t border-dashed pt-2 text-sm text-gray-500">
        Loading payment details...
      </div>
    );
  if (!paymentIntent) return null;

  const charge = paymentIntent.latest_charge as Stripe.Charge;

  console.log('charge', charge);

  return (
    <div className="mt-8 space-y-8">
      <section>
        <h3 className="font-medium text-gray-900">Payment Details</h3>
        <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
          <div className="flex justify-between py-3 text-sm font-medium">
            <dt className="text-gray-500">Status</dt>
            <dd className="font-medium capitalize text-green-600">{paymentIntent.status}</dd>
          </div>
          <div className="flex justify-between py-3 text-sm font-medium">
            <dt className="text-gray-500">Date</dt>
            <dd className="font-medium text-gray-900">
              {new Date(paymentIntent.created * 1000).toLocaleString()}
            </dd>
          </div>
        </dl>
        <div className="flex flex-col gap-4 py-4">
          <Link
            href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
            target="_blank"
            className="text-sm font-semibold text-indigo-600 hover:underline"
          >
            View on Stripe &rarr;
          </Link>

          {charge.receipt_url && (
            <Link
              href={charge.receipt_url}
              target="_blank"
              className="text-sm font-semibold text-indigo-600 hover:underline"
            >
              View Receipt &rarr;
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export type GuestWithAddress = {
  id: string;
  name: string;
  companyName: string | null;
  email: string | null;
  phone: string | null;
  address: {
    line1: string;
    city: string;
    postal_code: string;
    country: string;
  } | null;
  isHost: boolean;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  paymentIntentId: string | null;
};

export function ReservationDrawer({
  reservation,
  onClose,
}: {
  reservation: any | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  console.log('reservation', reservation);

  const togglePaymentMutation = useMutation({
    mutationFn: async (guestId: string) => {
      const res = await fetch(`/api/admin/guests/${guestId}/toggle-payment`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Failed to update status');
      return res.json();
    },
    onSuccess: () => {
      // When the mutation is successful, invalidate the main reservations query to refetch data
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });

  const host: GuestWithAddress = reservation?.guests.find((g: GuestWithAddress) => g.isHost);
  const otherGuests: GuestWithAddress[] = reservation?.guests.filter(
    (g: GuestWithAddress) => !g.isHost
  );

  const formatAddress = (address: GuestWithAddress['address']) => {
    if (!address) return 'N/A';
    return (
      <div className="text-end">
        <div className="text-gray-900">{address.line1}</div>
        <div className="text-gray-900">
          {address.postal_code}, {address.city}
        </div>
        <div className="text-gray-900">{address.country}</div>
      </div>
    );
  };

  return (
    <Dialog open={!!reservation} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Reservation Details
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={onClose}
                        className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <XMarkIcon aria-hidden="true" className="h-6 w-6 stroke-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {reservation && host && (
                    <div className="space-y-8">
                      {/* Host Information Section */}
                      <section>
                        <h3 className="font-medium text-gray-900">Host Information</h3>
                        <dl className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200">
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Full Name</dt>
                            <dd className="text-gray-900">{host.name}</dd>
                          </div>
                          {host.companyName && (
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt className="text-gray-500">Company</dt>
                              <dd className="text-gray-900">{host.companyName}</dd>
                            </div>
                          )}
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Email</dt>
                            <dd className="text-gray-900">{host.email}</dd>
                          </div>
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Phone</dt>
                            <dd className="text-gray-900">{host.phone || 'N/A'}</dd>
                          </div>
                          <div className="flex justify-between py-3 text-sm font-medium">
                            <dt className="text-gray-500">Address</dt>
                            <dd className="mt-1 pl-6 text-gray-900">
                              {formatAddress(host.address)}
                            </dd>
                          </div>
                        </dl>
                        {host.paymentStatus === 'PAID' && host.paymentIntentId && (
                          <StripePaymentDetails paymentIntentId={host.paymentIntentId} />
                        )}
                      </section>

                      {/* Guest List Section */}
                      <section>
                        <h3 className="font-medium text-gray-900">
                          Guest List ({otherGuests.length + 1} / {reservation.totalSeats})
                        </h3>
                        <ul
                          role="list"
                          className="mt-2 divide-y divide-gray-200 border-b border-t border-gray-200"
                        >
                          {[host, ...otherGuests].map(guest => (
                            <li key={guest.id} className="flex items-center justify-between py-3">
                              <div className="flex items-center">
                                {guest.paymentStatus === 'PAID' ? (
                                  <CheckCircleIcon className="h-6 w-6 stroke-green-500" />
                                ) : (
                                  <ClockIcon className="h-6 w-6 stroke-yellow-500" />
                                )}
                                <p className="mb-0 ml-3 text-sm font-medium text-gray-900">
                                  {guest.name} {guest.isHost && '(Host)'}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => togglePaymentMutation.mutate(guest.id)}
                                  disabled={togglePaymentMutation.isPending}
                                  className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 disabled:opacity-50"
                                >
                                  Toggle Paid
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
