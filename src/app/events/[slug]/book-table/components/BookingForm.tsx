'use client';

import React, { useEffect, useState } from 'react';
import {
  useForm,
  useFieldArray,
  UseFormRegister,
  FieldErrors,
  Controller,
  Control,
} from 'react-hook-form';
import CountrySelect, { countries, Country } from './CountrySelect';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { PhoneInput } from '@/app/events/[slug]/book-table/components/PhoneInput';

export interface BookingFormData {
  bookingType: 'individual' | 'table';
  joinByEmail?: string;
  totalSeats: number;
  paymentOption: 'full' | 'partial';
  hostInfo: {
    name: string;
    email: string;
    phone?: string;
    address: {
      line1: string;
      city: string;
      postal_code: string;
      country: Country | null;
    };
  };
  guests: { name: string }[];
}

interface Props {
  onFormSubmit: (formData: BookingFormData) => Promise<void>;
  isLoading: boolean;
}

const HostInfoFields = ({
  register,
  errors,
  control,
}: {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  control: Control<BookingFormData>; // Type plus précis pour `control`
}) => (
  <div className="space-y-4">
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
    <div>
      <Controller
        name="hostInfo.phone"
        control={control}
        rules={{
          required: 'Phone number is required',
          minLength: { value: 10, message: 'Please enter a valid phone number' },
        }}
        render={({ field, fieldState: { error } }) => (
          <PhoneInput value={field.value} onChange={field.onChange} error={error} />
        )}
      />
    </div>
    <div>
      <label htmlFor="address_line1" className="text-sm font-medium text-gray-800">
        Address
      </label>
      <input
        type="text"
        id="address_line1"
        placeholder="123 Main St"
        {...register('hostInfo.address.line1', { required: 'Address is required' })}
        className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
      />
      {errors.hostInfo?.address?.line1 && (
        <p className="mt-1 text-sm text-red-600">{errors.hostInfo.address.line1.message}</p>
      )}
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="city" className="text-sm font-medium text-gray-800">
          City
        </label>
        <input
          type="text"
          id="city"
          placeholder="New York"
          {...register('hostInfo.address.city', { required: 'City is required' })}
          className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
        />
        {errors.hostInfo?.address?.city && (
          <p className="mt-1 text-sm text-red-600">{errors.hostInfo.address.city.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="postal_code" className="text-sm font-medium text-gray-800">
          Postal Code
        </label>
        <input
          type="text"
          id="postal_code"
          placeholder="10001"
          {...register('hostInfo.address.postal_code', { required: 'Postal code is required' })}
          className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
        />
        {errors.hostInfo?.address?.postal_code && (
          <p className="mt-1 text-sm text-red-600">{errors.hostInfo.address.postal_code.message}</p>
        )}
      </div>
    </div>
    <div>
      <Controller
        name="hostInfo.address.country"
        control={control}
        rules={{ required: 'Country is required' }}
        render={({ field, fieldState: { error } }) => (
          <CountrySelect value={field.value} onChange={field.onChange} error={error} />
        )}
      />
    </div>
  </div>
);

export function BookingForm({ onFormSubmit, isLoading }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<BookingFormData>({
    mode: 'onTouched',
    defaultValues: {
      bookingType: undefined,
      totalSeats: 2,
      paymentOption: 'full',
      hostInfo: {
        name: '',
        email: '',
        phone: '',
        address: {
          line1: '',
          city: '',
          postal_code: '',
          country: countries.find(c => c.value === 'FR') || null,
        },
      },
      guests: [],
    },
  });

  const bookingType = watch('bookingType');
  const totalSeats = watch('totalSeats');
  const paymentOption = watch('paymentOption');

  const { fields, append, remove } = useFieldArray({ control, name: 'guests' });

  useEffect(() => {
    if (bookingType !== 'table') {
      if (fields.length > 0) remove();
      setValue('totalSeats', 1);
      return;
    }
    const requiredGuestCount = totalSeats - 1;
    const currentGuestCount = fields.length;
    if (requiredGuestCount > currentGuestCount) {
      append(Array(requiredGuestCount - currentGuestCount).fill({ name: '' }));
    } else if (requiredGuestCount < currentGuestCount) {
      remove(
        Array.from(
          { length: currentGuestCount - requiredGuestCount },
          (_, i) => requiredGuestCount + i
        )
      );
    }
  }, [totalSeats, bookingType, fields, append, remove, setValue]);

  const handlePrev = () => {
    setCurrentStep(s => s - 1);
  };

  const handleNext = async () => {
    let fieldsToValidate: (keyof BookingFormData | `guests.${number}.name` | 'hostInfo.address')[] =
      [];
    if (currentStep === 1 && bookingType === 'individual') {
      fieldsToValidate = ['hostInfo'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['hostInfo'];
    } else if (currentStep === 4) {
      fieldsToValidate = ['guests'];
    }
    const isValid = await trigger(fieldsToValidate);
    if (!isValid) return;
    if (currentStep === 3 && paymentOption === 'full') {
      await handleSubmit(processAndSubmit)();
    } else if (currentStep === 3 && paymentOption === 'partial') {
      setCurrentStep(4);
    }
  };

  const processAndSubmit = async (formData: BookingFormData) => {
    await onFormSubmit(formData);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Choose your booking type</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label
                htmlFor="type_individual"
                className="relative flex h-full cursor-pointer flex-col justify-center rounded-md border p-4 text-center shadow-sm transition-all hover:bg-gray-100"
              >
                <input
                  type="radio"
                  id="type_individual"
                  value="individual"
                  className="sr-only"
                  {...register('bookingType')}
                  onClick={() => {
                    setValue('bookingType', 'individual');
                    setCurrentStep(1);
                  }}
                />
                <span className="font-medium text-gray-800">Book an Individual Seat</span>
              </label>
              <label
                htmlFor="type_table"
                className="relative flex h-full cursor-pointer flex-col justify-center rounded-md border p-4 text-center shadow-sm transition-all hover:bg-gray-100"
              >
                <input
                  type="radio"
                  id="type_table"
                  value="table"
                  className="sr-only"
                  {...register('bookingType')}
                  onClick={() => {
                    setValue('bookingType', 'table');
                    setCurrentStep(1);
                  }}
                />
                <span className="font-medium text-gray-800">Create a Table</span>
              </label>
            </div>
          </div>
        );
      case 1:
        if (bookingType === 'individual') {
          return (
            <div className="space-y-8">
              <div className="space-y-4 rounded-md border border-gray-200 p-4">
                <h3 className="text-lg font-semibold text-gray-800">Your Information</h3>
                <HostInfoFields register={register} errors={errors} control={control} />
              </div>
              {/* TODO implement later */}
              {/*<div className="space-y-4 rounded-md border border-gray-200 p-4">*/}
              {/*  <h3 className="text-lg font-semibold text-gray-800">Join a Table (Optional)</h3>*/}
              {/*  <p className="text-sm text-gray-600">*/}
              {/*    If you want to join an existing table, enter the email address of the host or*/}
              {/*    another guest from that table.*/}
              {/*  </p>*/}
              {/*  <div>*/}
              {/*    <label htmlFor="joinByEmail" className="text-sm font-medium text-gray-800">*/}
              {/*      Host or Guest&apos;s Email*/}
              {/*    </label>*/}
              {/*    <input*/}
              {/*      type="email"*/}
              {/*      id="joinByEmail"*/}
              {/*      placeholder="friend@example.com"*/}
              {/*      {...register('joinByEmail')}*/}
              {/*      className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          );
        }
        return (
          <div className="space-y-4 rounded-md border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-800">How many seats at your table?</h3>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
              {[...Array(9)].map((_, i) => {
                const seatCount = i + 2;
                return (
                  <label
                    key={seatCount}
                    htmlFor={`seats_${seatCount}`}
                    className="flex cursor-pointer items-center justify-center rounded-md border p-4 text-center text-gray-800 shadow-sm transition-all hover:bg-gray-100"
                  >
                    <input
                      type="radio"
                      id={`seats_${seatCount}`}
                      value={seatCount}
                      checked={totalSeats === seatCount}
                      className="sr-only"
                      readOnly
                      onClick={() => {
                        setValue('totalSeats', seatCount, { shouldValidate: true });
                        setTimeout(() => setCurrentStep(2), 200);
                      }}
                    />
                    {seatCount}
                  </label>
                );
              })}
            </div>
          </div>
        );
      // case 2:
      //   return (
      //     <div className="space-y-4 rounded-md border border-gray-200 p-4">
      //       <h3 className="text-lg font-semibold text-gray-800">Who is paying?</h3>
      //       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      //         <label
      //           htmlFor="pay_partial"
      //           className="b-gray-50 relative flex h-full flex-col justify-start rounded-md border p-4 transition-all hover:cursor-not-allowed"
      //         >
      //           <input
      //             type="radio"
      //             id="pay_partial"
      //             value="partial"
      //             className="sr-only"
      //             {...register('paymentOption')}
      //             // TODO Reactivate later
      //             // onClick={() => {
      //             //   setValue('paymentOption', 'partial');
      //             //   setCurrentStep(3);
      //             // }}
      //           />
      //           <span className="font-medium text-gray-800">Pay My Share</span>
      //           <div className="text-sm text-gray-500">
      //             You will pay for your seat, and guests will pay for theirs.
      //           </div>
      //           <div className="pt-4">
      //             <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
      //               Coming soon
      //             </span>
      //           </div>
      //         </label>
      //         <label
      //           htmlFor="pay_full"
      //           className="relative flex h-full flex-col justify-start rounded-md border p-4 shadow-sm transition-all hover:cursor-pointer hover:bg-gray-100"
      //         >
      //           <input
      //             type="radio"
      //             id="pay_full"
      //             value="full"
      //             className="sr-only"
      //             {...register('paymentOption')}
      //             onClick={() => {
      //               setValue('paymentOption', 'full');
      //               setCurrentStep(3);
      //             }}
      //           />
      //           <span className="font-medium text-gray-800">Pay for Full Table</span>
      //           <div className="text-sm text-gray-500">
      //             You will pay for all seats at the table now.
      //           </div>
      //         </label>
      //       </div>
      //     </div>
      //   );
      case 2:
        return (
          <div className="space-y-4 rounded-md border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-800">Your Information as Host</h3>
            {/* On passe bien `control` ici aussi */}
            <HostInfoFields register={register} errors={errors} control={control} />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 rounded-md border border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-800">Guest Names</h3>
            <p className="text-sm text-gray-600">Please enter the names of your guests.</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {fields.map((field, index) => (
                <div key={field.id}>
                  <label
                    htmlFor={`guestName-${index}`}
                    className="text-sm font-medium text-gray-800"
                  >{`Guest ${index + 1} Name`}</label>
                  <input
                    id={`guestName-${index}`}
                    type="text"
                    placeholder="John Smith"
                    {...register(`guests.${index}.name`, { required: 'Guest name is required' })}
                    className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                  />
                  {errors.guests?.[index]?.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.guests[index]?.name?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(processAndSubmit)} className="space-y-4">
      <div>
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-300"
          >
            <ArrowLeftIcon className="size-4 fill-gray-900" />
            Back
          </button>
        )}
      </div>
      <div className="transition-all duration-300">{renderContent()}</div>
      <div className="flex items-center justify-between">
        {currentStep === 1 && bookingType === 'individual' && (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Continue to Payment'}
          </button>
        )}
        {currentStep === 2 && bookingType === 'table' && (
          <button
            type={paymentOption === 'full' ? 'submit' : 'button'}
            onClick={handleNext}
            disabled={isLoading}
            className="w-full rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading
              ? 'Processing...'
              : paymentOption === 'full'
                ? 'Continue to Payment'
                : 'Next'}
          </button>
        )}
        {currentStep === 3 && bookingType === 'table' && (
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-indigo-600 px-6 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Continue to Payment'}
          </button>
        )}
      </div>
    </form>
  );
}
