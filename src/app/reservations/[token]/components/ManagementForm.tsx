'use client';

import React from 'react';
import {
  useForm,
  useFieldArray,
  Control,
  FieldErrors,
  UseFormRegister,
  Controller,
  SubmitHandler,
  DeepPartial,
} from 'react-hook-form';
import CountrySelectComponent from './CountrySelect';
import { Country } from './CountrySelect';
import PhoneInputLibrary from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export interface ManagementFormData {
  hostInfo: {
    name: string;
    companyName?: string;
    email: string;
    phone?: string;
    address: {
      line1: string;
      city: string;
      postal_code: string;
      country: Country | null;
    };
  };
  guests: { id: string; name: string }[];
}

interface Props {
  onSubmit: (data: ManagementFormData) => Promise<void>;
  isLoading: boolean;
  defaultValues: DeepPartial<ManagementFormData>;
}

const HostInfoFields = ({
  register,
  errors,
  control,
}: {
  register: UseFormRegister<ManagementFormData>;
  errors: FieldErrors<ManagementFormData>;
  control: Control<ManagementFormData>;
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
      <label htmlFor="companyName" className="text-sm font-medium text-gray-800">
        Company Name (Optional)
      </label>
      <input
        type="text"
        id="companyName"
        placeholder="e.g., ISC Fund Inc."
        {...register('hostInfo.companyName')}
        className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
      />
    </div>
    <div>
      <label htmlFor="hostEmail" className="text-sm font-medium text-gray-800">
        Email Address
      </label>
      <input
        type="email"
        id="hostEmail"
        placeholder="you@example.com"
        {...register('hostInfo.email', { required: 'Your email is required' })}
        className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
      />
      {errors.hostInfo?.email && (
        <p className="mt-1 text-sm text-red-600">{errors.hostInfo.email.message}</p>
      )}
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-900">Phone number</label>
      <Controller
        name="hostInfo.phone"
        control={control}
        rules={{ required: 'Phone number is required' }}
        render={({ field }) => (
          <PhoneInputLibrary
            {...field}
            international
            defaultCountry="FR"
            className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
          />
        )}
      />
      {errors.hostInfo?.phone && (
        <p className="mt-1 text-sm text-red-600">{errors.hostInfo.phone.message}</p>
      )}
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
          <CountrySelectComponent
            value={field.value as Country | null}
            onChange={field.onChange}
            error={error}
          />
        )}
      />
    </div>
  </div>
);

export function ManagementForm({ onSubmit, isLoading, defaultValues }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ManagementFormData>({
    defaultValues,
  });

  const { fields } = useFieldArray({ control, name: 'guests' });

  const processSubmit: SubmitHandler<ManagementFormData> = data => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(processSubmit)} className="space-y-8">
      <div className="space-y-4 rounded-md border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-800">Your Information (for Tax Receipt)</h3>
        <HostInfoFields register={register} errors={errors} control={control} />
      </div>

      {fields.length > 0 && (
        <div className="space-y-4 rounded-md border border-gray-200 p-4">
          <h3 className="text-lg font-semibold text-gray-800">Guest Names</h3>
          <p className="text-sm text-gray-600">
            Please provide the names of the other guests at your table.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fields.map((field, index) => (
              <div key={field.id}>
                <label
                  htmlFor={`guests.${index}.name`}
                  className="text-sm font-medium text-gray-800"
                >{`Guest ${index + 2} Name`}</label>
                <input
                  id={`guests.${index}.name`}
                  type="text"
                  placeholder="John Smith"
                  {...register(`guests.${index}.name`, { required: 'Guest name is required' })}
                  className="mt-1 w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                />
                {errors.guests?.[index]?.name && (
                  <p className="mt-1 text-sm text-red-600">This field is required</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
      >
        {isLoading ? 'Saving...' : 'Save Reservation Details'}
      </button>
    </form>
  );
}
