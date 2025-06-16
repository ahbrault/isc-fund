'use client';

import React from 'react';
import { FieldError } from 'react-hook-form';
import { phoneCodes } from './phone-codes';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

// The props our component will accept from react-hook-form's Controller
interface PhoneInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  error?: FieldError;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, error }) => {
  // We determine the initial country code and number from the value prop
  const initialCountry =
    phoneCodes.find(c => value?.startsWith(c.dial_code)) || phoneCodes.find(c => c.code === 'FR')!; // Default to France

  const initialNumber = value?.substring(initialCountry.dial_code.length) || '';

  // This function is called when either the select or the input changes
  const handleChange = (newCountryCode: string, newNumber: string) => {
    // We call the main `onChange` from react-hook-form with the combined value
    onChange(`${newCountryCode}${newNumber}`);
  };

  return (
    <div>
      <label htmlFor="phone-number" className="block text-sm font-medium text-gray-900">
        Phone number
      </label>
      <div className="mt-1">
        <div className="flex rounded-md bg-white outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <div className="relative">
            <select
              id="country-code"
              aria-label="Country code"
              className="h-full appearance-none rounded-l-md border-0 border-r border-gray-300 bg-transparent py-2 pl-3 pr-9 text-base text-gray-500 focus:outline-none sm:text-sm"
              value={initialCountry.dial_code}
              onChange={e => handleChange(e.target.value, initialNumber)}
            >
              {phoneCodes.map(country => (
                <option key={country.code} value={country.dial_code}>
                  {country.code} ({country.dial_code})
                </option>
              ))}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
            />
          </div>
          <input
            id="phone-number"
            type="tel"
            placeholder="6 12 34 56 78"
            className="block min-w-0 flex-1 border-0 bg-transparent py-2 pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
            value={initialNumber}
            onChange={e => handleChange(initialCountry.dial_code, e.target.value)}
          />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
