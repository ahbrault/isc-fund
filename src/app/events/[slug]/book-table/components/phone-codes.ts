// This file contains a list of country calling codes with their flags.
export type PhoneCountry = {
  name: string;
  dial_code: string;
  code: string; // ISO 3166-1 alpha-2 code
  flag: string;
};

export const phoneCodes: PhoneCountry[] = [
  { name: 'France', dial_code: '+33', code: 'FR', flag: '🇫🇷' },
  { name: 'United States', dial_code: '+1', code: 'US', flag: '🇺🇸' },
  { name: 'United Kingdom', dial_code: '+44', code: 'GB', flag: '🇬🇧' },
  { name: 'Belgium', dial_code: '+32', code: 'BE', flag: '🇧🇪' },
  { name: 'Switzerland', dial_code: '+41', code: 'CH', flag: '🇨🇭' },
  { name: 'Canada', dial_code: '+1', code: 'CA', flag: '🇨🇦' },
  { name: 'Germany', dial_code: '+49', code: 'DE', flag: '🇩🇪' },
  { name: 'Spain', dial_code: '+34', code: 'ES', flag: '🇪🇸' },
  { name: 'Italy', dial_code: '+39', code: 'IT', flag: '🇮🇹' },
  // Feel free to add more countries
];
