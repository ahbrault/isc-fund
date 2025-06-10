'use client';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';

export type Country = {
  value: string;
  name: string;
};

// La liste des pays extraite de votre HTML
export const countries: Country[] = [
  { value: 'AF', name: 'Afghanistan' },
  { value: 'AX', name: 'Åland Islands' },
  { value: 'AL', name: 'Albania' },
  { value: 'DZ', name: 'Algeria' },
  { value: 'AD', name: 'Andorra' },
  { value: 'AO', name: 'Angola' },
  { value: 'AI', name: 'Anguilla' },
  { value: 'AQ', name: 'Antarctica' },
  { value: 'AG', name: 'Antigua & Barbuda' },
  { value: 'AR', name: 'Argentina' },
  { value: 'AM', name: 'Armenia' },
  { value: 'AW', name: 'Aruba' },
  { value: 'AC', name: 'Ascension Island' },
  { value: 'AU', name: 'Australia' },
  { value: 'AT', name: 'Austria' },
  { value: 'AZ', name: 'Azerbaijan' },
  { value: 'BS', name: 'Bahamas' },
  { value: 'BH', name: 'Bahrain' },
  { value: 'BD', name: 'Bangladesh' },
  { value: 'BB', name: 'Barbados' },
  { value: 'BY', name: 'Belarus' },
  { value: 'BE', name: 'Belgium' },
  { value: 'BZ', name: 'Belize' },
  { value: 'BJ', name: 'Benin' },
  { value: 'BM', name: 'Bermuda' },
  { value: 'BT', name: 'Bhutan' },
  { value: 'BO', name: 'Bolivia' },
  { value: 'BA', name: 'Bosnia & Herzegovina' },
  { value: 'BW', name: 'Botswana' },
  { value: 'BV', name: 'Bouvet Island' },
  { value: 'BR', name: 'Brazil' },
  { value: 'IO', name: 'British Indian Ocean Territory' },
  { value: 'VG', name: 'British Virgin Islands' },
  { value: 'BN', name: 'Brunei' },
  { value: 'BG', name: 'Bulgaria' },
  { value: 'BF', name: 'Burkina Faso' },
  { value: 'BI', name: 'Burundi' },
  { value: 'KH', name: 'Cambodia' },
  { value: 'CM', name: 'Cameroon' },
  { value: 'CA', name: 'Canada' },
  { value: 'CV', name: 'Cape Verde' },
  { value: 'BQ', name: 'Caribbean Netherlands' },
  { value: 'KY', name: 'Cayman Islands' },
  { value: 'CF', name: 'Central African Republic' },
  { value: 'TD', name: 'Chad' },
  { value: 'CL', name: 'Chile' },
  { value: 'CN', name: 'China' },
  { value: 'CO', name: 'Colombia' },
  { value: 'KM', name: 'Comoros' },
  { value: 'CG', name: 'Congo - Brazzaville' },
  { value: 'CD', name: 'Congo - Kinshasa' },
  { value: 'CK', name: 'Cook Islands' },
  { value: 'CR', name: 'Costa Rica' },
  { value: 'CI', name: 'Côte d’Ivoire' },
  { value: 'HR', name: 'Croatia' },
  { value: 'CW', name: 'Curaçao' },
  { value: 'CY', name: 'Cyprus' },
  { value: 'CZ', name: 'Czechia' },
  { value: 'DK', name: 'Denmark' },
  { value: 'DJ', name: 'Djibouti' },
  { value: 'DM', name: 'Dominica' },
  { value: 'DO', name: 'Dominican Republic' },
  { value: 'EC', name: 'Ecuador' },
  { value: 'EG', name: 'Egypt' },
  { value: 'SV', name: 'El Salvador' },
  { value: 'GQ', name: 'Equatorial Guinea' },
  { value: 'ER', name: 'Eritrea' },
  { value: 'EE', name: 'Estonia' },
  { value: 'SZ', name: 'Eswatini' },
  { value: 'ET', name: 'Ethiopia' },
  { value: 'FK', name: 'Falkland Islands' },
  { value: 'FO', name: 'Faroe Islands' },
  { value: 'FJ', name: 'Fiji' },
  { value: 'FI', name: 'Finland' },
  { value: 'FR', name: 'France' },
  { value: 'GF', name: 'French Guiana' },
  { value: 'PF', name: 'French Polynesia' },
  { value: 'TF', name: 'French Southern Territories' },
  { value: 'GA', name: 'Gabon' },
  { value: 'GM', name: 'Gambia' },
  { value: 'GE', name: 'Georgia' },
  { value: 'DE', name: 'Germany' },
  { value: 'GH', name: 'Ghana' },
  { value: 'GI', name: 'Gibraltar' },
  { value: 'GR', name: 'Greece' },
  { value: 'GL', name: 'Greenland' },
  { value: 'GD', name: 'Grenada' },
  { value: 'GP', name: 'Guadeloupe' },
  { value: 'GU', name: 'Guam' },
  { value: 'GT', name: 'Guatemala' },
  { value: 'GG', name: 'Guernsey' },
  { value: 'GN', name: 'Guinea' },
  { value: 'GW', name: 'Guinea-Bissau' },
  { value: 'GY', name: 'Guyana' },
  { value: 'HT', name: 'Haiti' },
  { value: 'HN', name: 'Honduras' },
  { value: 'HK', name: 'Hong Kong SAR China' },
  { value: 'HU', name: 'Hungary' },
  { value: 'IS', name: 'Iceland' },
  { value: 'IN', name: 'India' },
  { value: 'ID', name: 'Indonesia' },
  { value: 'IQ', name: 'Iraq' },
  { value: 'IE', name: 'Ireland' },
  { value: 'IM', name: 'Isle of Man' },
  { value: 'IL', name: 'Israel' },
  { value: 'IT', name: 'Italy' },
  { value: 'JM', name: 'Jamaica' },
  { value: 'JP', name: 'Japan' },
  { value: 'JE', name: 'Jersey' },
  { value: 'JO', name: 'Jordan' },
  { value: 'KZ', name: 'Kazakhstan' },
  { value: 'KE', name: 'Kenya' },
  { value: 'KI', name: 'Kiribati' },
  { value: 'XK', name: 'Kosovo' },
  { value: 'KW', name: 'Kuwait' },
  { value: 'KG', name: 'Kyrgyzstan' },
  { value: 'LA', name: 'Laos' },
  { value: 'LV', name: 'Latvia' },
  { value: 'LB', name: 'Lebanon' },
  { value: 'LS', name: 'Lesotho' },
  { value: 'LR', name: 'Liberia' },
  { value: 'LY', name: 'Libya' },
  { value: 'LI', name: 'Liechtenstein' },
  { value: 'LT', name: 'Lithuania' },
  { value: 'LU', name: 'Luxembourg' },
  { value: 'MO', name: 'Macao SAR China' },
  { value: 'MG', name: 'Madagascar' },
  { value: 'MW', name: 'Malawi' },
  { value: 'MY', name: 'Malaysia' },
  { value: 'MV', name: 'Maldives' },
  { value: 'ML', name: 'Mali' },
  { value: 'MT', name: 'Malta' },
  { value: 'MQ', name: 'Martinique' },
  { value: 'MR', name: 'Mauritania' },
  { value: 'MU', name: 'Mauritius' },
  { value: 'YT', name: 'Mayotte' },
  { value: 'MX', name: 'Mexico' },
  { value: 'MD', name: 'Moldova' },
  { value: 'MC', name: 'Monaco' },
  { value: 'MN', name: 'Mongolia' },
  { value: 'ME', name: 'Montenegro' },
  { value: 'MS', name: 'Montserrat' },
  { value: 'MA', name: 'Morocco' },
  { value: 'MZ', name: 'Mozambique' },
  { value: 'MM', name: 'Myanmar (Burma)' },
  { value: 'NA', name: 'Namibia' },
  { value: 'NR', name: 'Nauru' },
  { value: 'NP', name: 'Nepal' },
  { value: 'NL', name: 'Netherlands' },
  { value: 'NC', name: 'New Caledonia' },
  { value: 'NZ', name: 'New Zealand' },
  { value: 'NI', name: 'Nicaragua' },
  { value: 'NE', name: 'Niger' },
  { value: 'NG', name: 'Nigeria' },
  { value: 'NU', name: 'Niue' },
  { value: 'MK', name: 'North Macedonia' },
  { value: 'NO', name: 'Norway' },
  { value: 'OM', name: 'Oman' },
  { value: 'PK', name: 'Pakistan' },
  { value: 'PS', name: 'Palestinian Territories' },
  { value: 'PA', name: 'Panama' },
  { value: 'PG', name: 'Papua New Guinea' },
  { value: 'PY', name: 'Paraguay' },
  { value: 'PE', name: 'Peru' },
  { value: 'PH', name: 'Philippines' },
  { value: 'PN', name: 'Pitcairn Islands' },
  { value: 'PL', name: 'Poland' },
  { value: 'PT', name: 'Portugal' },
  { value: 'PR', name: 'Puerto Rico' },
  { value: 'QA', name: 'Qatar' },
  { value: 'RE', name: 'Réunion' },
  { value: 'RO', name: 'Romania' },
  { value: 'RU', name: 'Russia' },
  { value: 'RW', name: 'Rwanda' },
  { value: 'WS', name: 'Samoa' },
  { value: 'SM', name: 'San Marino' },
  { value: 'ST', name: 'São Tomé & Príncipe' },
  { value: 'SA', name: 'Saudi Arabia' },
  { value: 'SN', name: 'Senegal' },
  { value: 'RS', name: 'Serbia' },
  { value: 'SC', name: 'Seychelles' },
  { value: 'SL', name: 'Sierra Leone' },
  { value: 'SG', name: 'Singapore' },
  { value: 'SX', name: 'Sint Maarten' },
  { value: 'SK', name: 'Slovakia' },
  { value: 'SI', name: 'Slovenia' },
  { value: 'SB', name: 'Solomon Islands' },
  { value: 'SO', name: 'Somalia' },
  { value: 'ZA', name: 'South Africa' },
  { value: 'GS', name: 'South Georgia & South Sandwich Islands' },
  { value: 'KR', name: 'South Korea' },
  { value: 'SS', name: 'South Sudan' },
  { value: 'ES', name: 'Spain' },
  { value: 'LK', name: 'Sri Lanka' },
  { value: 'BL', name: 'St. Barthélemy' },
  { value: 'SH', name: 'St. Helena' },
  { value: 'KN', name: 'St. Kitts & Nevis' },
  { value: 'LC', name: 'St. Lucia' },
  { value: 'MF', name: 'St. Martin' },
  { value: 'PM', name: 'St. Pierre & Miquelon' },
  { value: 'VC', name: 'St. Vincent & Grenadines' },
  { value: 'SD', name: 'Sudan' },
  { value: 'SR', name: 'Suriname' },
  { value: 'SJ', name: 'Svalbard & Jan Mayen' },
  { value: 'SE', name: 'Sweden' },
  { value: 'CH', name: 'Switzerland' },
  { value: 'TW', name: 'Taiwan' },
  { value: 'TJ', name: 'Tajikistan' },
  { value: 'TZ', name: 'Tanzania' },
  { value: 'TH', name: 'Thailand' },
  { value: 'TL', name: 'Timor-Leste' },
  { value: 'TG', name: 'Togo' },
  { value: 'TK', name: 'Tokelau' },
  { value: 'TO', name: 'Tonga' },
  { value: 'TT', name: 'Trinidad & Tobago' },
  { value: 'TA', name: 'Tristan da Cunha' },
  { value: 'TN', name: 'Tunisia' },
  { value: 'TR', name: 'Türkiye' },
  { value: 'TM', name: 'Turkmenistan' },
  { value: 'TC', name: 'Turks & Caicos Islands' },
  { value: 'TV', name: 'Tuvalu' },
  { value: 'UG', name: 'Uganda' },
  { value: 'UA', name: 'Ukraine' },
  { value: 'AE', name: 'United Arab Emirates' },
  { value: 'GB', name: 'United Kingdom' },
  { value: 'US', name: 'United States' },
  { value: 'UY', name: 'Uruguay' },
  { value: 'UZ', name: 'Uzbekistan' },
  { value: 'VU', name: 'Vanuatu' },
  { value: 'VA', name: 'Vatican City' },
  { value: 'VE', name: 'Venezuela' },
  { value: 'VN', name: 'Vietnam' },
  { value: 'WF', name: 'Wallis & Futuna' },
  { value: 'EH', name: 'Western Sahara' },
  { value: 'YE', name: 'Yemen' },
  { value: 'ZM', name: 'Zambia' },
  { value: 'ZW', name: 'Zimbabwe' },
];

// Props pour notre composant contrôlé
interface CountrySelectProps {
  value: Country | null;
  onChange: (country: Country | null) => void;
  error?: FieldError;
}

export default function CountrySelect({ value, onChange, error }: CountrySelectProps) {
  const [query, setQuery] = useState('');

  const filteredCountries =
    query === ''
      ? countries
      : countries.filter(country => {
          return country.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    // Combobox est déjà un bon choix car il est sémantiquement un champ de formulaire
    <Field>
      <Label className="text-sm font-medium text-gray-900">Country</Label>
      <Combobox
        value={value}
        onChange={onChange} // Utilise la fonction onChange de react-hook-form
      >
        <div className="relative mt-1">
          <ComboboxInput
            className="block w-full rounded-md bg-white py-2 pl-3 pr-12 text-lg text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 transition-all placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
            onChange={event => setQuery(event.target.value)}
            onBlur={() => setQuery('')}
            displayValue={(country: Country) => country?.name || ''}
            placeholder="Select a country"
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="size-5 fill-gray-600" aria-hidden="true" />
          </ComboboxButton>

          {filteredCountries.length > 0 && (
            <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredCountries.map(country => (
                <ComboboxOption
                  key={country.value}
                  value={country}
                  className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 hover:cursor-pointer data-[focus]:bg-indigo-600 data-[focus]:text-white"
                >
                  <span className="block truncate text-gray-900 group-hover:text-white group-data-[selected]:font-semibold group-data-[focus]:text-white group-data-[selected]:text-white">
                    {country.name}
                  </span>
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          )}
        </div>
      </Combobox>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </Field>
  );
}
