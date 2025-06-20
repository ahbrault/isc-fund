'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { EventAvailability } from '@/common';

export interface BookingFormData {
  bookingType: 'individual' | 'table';
  totalSeats: number;
  paymentOption: 'full' | 'partial';
  hostInfo: {
    name: string;
    email: string;
  };
}

interface Props {
  onFormSubmit: (formData: BookingFormData) => Promise<void>;
  isLoading: boolean;
  availability: EventAvailability;
}

const RadioCard = ({ id, name, label, value, register, currentSelection, ...rest }: any) => (
  <label
    htmlFor={id}
    className={`relative flex h-full cursor-pointer flex-col justify-center rounded-md border p-4 text-center shadow-sm transition-all hover:bg-gray-100 ${
      currentSelection === value
        ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-400'
        : 'border-gray-200'
    }`}
  >
    <input type="radio" id={id} value={value} className="sr-only" {...register(name)} {...rest} />
    <span className="font-medium text-gray-800">{label}</span>
  </label>
);

export function BookingForm({ onFormSubmit, isLoading, availability }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      bookingType: 'individual',
      totalSeats: 1,
      paymentOption: 'full',
      hostInfo: { name: '', email: '' },
    },
  });

  const bookingType = watch('bookingType');

  const maxSeatsAllowed = Math.min(10, availability.availableSeats);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      {/* Section for Booking Type */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">1. Your Reservation</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RadioCard
            id="type_individual"
            name="bookingType"
            label="Individual Seat"
            value="individual"
            register={register}
            currentSelection={bookingType}
            onClick={() => setValue('totalSeats', 1)}
          />
          <RadioCard
            id="type_table"
            name="bookingType"
            label="A Full Table"
            value="table"
            register={register}
            currentSelection={bookingType}
            onClick={() => setValue('totalSeats', maxSeatsAllowed >= 2 ? 2 : 1)}
          />
        </div>
      </div>

      {/* Section for Table Details (Conditional) */}
      {bookingType === 'table' && (
        <div className="space-y-4 rounded-md border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-800">2. Table Details</h3>
          {maxSeatsAllowed < 2 ? (
            <p className="text-sm text-red-600">
              Unfortunately, there are not enough seats available to book a full table.
            </p>
          ) : (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-800">
                  Number of Seats
                </label>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                  {[...Array(maxSeatsAllowed - 1)].map((_, i) => {
                    const seatCount = i + 2;
                    return (
                      <RadioCard
                        key={seatCount}
                        id={`seats_${seatCount}`}
                        name="totalSeats"
                        label={`${seatCount}`}
                        value={seatCount}
                        register={register}
                        currentSelection={watch('totalSeats')}
                      />
                    );
                  })}
                </div>
                {maxSeatsAllowed < 10 && (
                  <p className="mt-2 text-sm text-yellow-700">
                    Note: The maximum number of seats has been reduced due to limited availability.
                  </p>
                )}
              </div>
              {/*<div>*/}
              {/*  <label className="mb-2 mt-4 block text-sm font-medium text-gray-800">*/}
              {/*    Payment Option*/}
              {/*  </label>*/}
              {/*<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">*/}
              {/*  <RadioCard*/}
              {/*    id="pay_full"*/}
              {/*    name="paymentOption"*/}
              {/*    label="Pay for All Seats"*/}
              {/*    value="full"*/}
              {/*    register={register}*/}
              {/*    currentSelection={watch('paymentOption')}*/}
              {/*  />*/}
              {/*  <RadioCard*/}
              {/*    id="pay_partial"*/}
              {/*    name="paymentOption"*/}
              {/*    label="Pay My Share Only"*/}
              {/*    value="partial"*/}
              {/*    register={register}*/}
              {/*    currentSelection={watch('paymentOption')}*/}
              {/*  />*/}
              {/*</div>*/}
              {/*</div>*/}
            </>
          )}
        </div>
      )}

      {/* Section for Your Information (Simplified) */}
      <div className="space-y-4 rounded-md border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {bookingType === 'table' ? '3. Your Information' : '2. Your Information'}
        </h3>
        <div>
          <label htmlFor="hostName" className="text-sm font-medium text-gray-800">
            Full Name
          </label>
          <input
            type="text"
            id="hostName"
            placeholder="Jane Doe"
            {...register('hostInfo.name', { required: 'Your name is required' })}
            className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
          {errors.hostInfo?.name && (
            <p className="mt-1 text-sm text-red-600">{errors.hostInfo.name.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="hostEmail" className="text-sm font-medium text-gray-800">
            Email Address
          </label>
          <input
            type="email"
            id="hostEmail"
            placeholder="you@example.com"
            {...register('hostInfo.email', {
              required: 'Your email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
            })}
            className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
          {errors.hostInfo?.email && (
            <p className="mt-1 text-sm text-red-600">{errors.hostInfo.email.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || (bookingType === 'table' && maxSeatsAllowed < 2)}
        className="w-full rounded-md bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        {isLoading ? 'Processing...' : 'Continue to Payment'}
      </button>
    </form>
  );
}
