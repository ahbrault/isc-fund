// 'use client';
//
// import { useEffect, useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
//
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
//
// const donationOptions = [
//   { id: 'donation-60', label: '$60 - 1 kid', amount: 60 },
//   { id: 'donation-600', label: '$600 - 10 kids', amount: 600 },
//   { id: 'donation-6000', label: '$6000 - 100 kids', amount: 6000 },
//   { id: 'custom', label: 'Custom amount', amount: 0 },
// ];
//
// function DonationForm() {
//   const stripe = useStripe();
//   const elements = useElements();
//
//   const [selectedOption, setSelectedOption] = useState(donationOptions[0]);
//   const [customAmount, setCustomAmount] = useState('');
//   const [email, setEmail] = useState('');
//   const [clientSecret, setClientSecret] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//
//   const getAmount = () =>
//     selectedOption.id === 'custom' ? parseFloat(customAmount) : selectedOption.amount;
//
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//
//     if (!stripe || !elements) return;
//     const amount = getAmount();
//
//     if (!amount || amount < 1) {
//       setMessage('Please enter a valid amount.');
//       return;
//     }
//
//     setLoading(true);
//
//     // Créer le client secret côté serveur
//     const res = await fetch('/api/create-payment-intent', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         amount,
//         email,
//         description: selectedOption.label,
//       }),
//     });
//
//     const data = await res.json();
//
//     if (!data.clientSecret) {
//       setMessage('Error creating payment intent.');
//       setLoading(false);
//       return;
//     }
//
//     setClientSecret(data.clientSecret);
//
//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `${window.location.origin}/donate/return`,
//         receipt_email: email,
//       },
//     });
//
//     if (error) {
//       setMessage(error.message || 'Payment error');
//     }
//
//     setLoading(false);
//   };
//
//   return (
//     <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6">
//       <h2 className="text-2xl font-semibold">Make a donation</h2>
//
//       <div className="space-y-4">
//         {donationOptions.map(opt => (
//           <label
//             key={opt.id}
//             className={`block rounded-lg border p-4 ${selectedOption.id === opt.id ? 'border-indigo-600' : 'border-gray-300'}`}
//           >
//             <input
//               type="radio"
//               name="donation"
//               value={opt.id}
//               className="sr-only"
//               onChange={() => setSelectedOption(opt)}
//               checked={selectedOption.id === opt.id}
//             />
//             <span>{opt.label}</span>
//             {opt.id === 'custom' && (
//               <input
//                 type="number"
//                 placeholder="Enter amount"
//                 className="ml-4 rounded border px-2 py-1"
//                 value={customAmount}
//                 onChange={e => setCustomAmount(e.target.value)}
//                 disabled={selectedOption.id !== 'custom'}
//               />
//             )}
//           </label>
//         ))}
//       </div>
//
//       <label className="block">
//         <span className="text-sm font-medium">Email</span>
//         <input
//           type="email"
//           className="mt-1 w-full rounded border px-3 py-2"
//           placeholder="you@example.com"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//         />
//       </label>
//
//       <PaymentElement />
//
//       <button
//         type="submit"
//         className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
//         disabled={!stripe || loading}
//       >
//         {loading ? 'Processing...' : `Donate $${getAmount()}`}
//       </button>
//
//       {message && <div className="text-red-600">{message}</div>}
//     </form>
//   );
// }
//
// export default function Page() {
//   const [clientSecret, setClientSecret] = useState('');
//
//   const getAmount = () => 60; // valeur par défaut (sera écrasée ensuite)
//
//   useEffect(() => {
//     // Crée un PaymentIntent au chargement pour pré-charger le formulaire
//     fetch('/api/create-payment-intent', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         amount: getAmount(),
//         email: 'you@example.com',
//         description: 'Initial load',
//       }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         setClientSecret(data.clientSecret);
//       });
//   }, []);
//
//   const appearance = {
//     theme: 'stripe' as const,
//   };
//
//   const options = {
//     clientSecret,
//     appearance,
//   };
//
//   return (
//     <div className="px-4 py-10">
//       {clientSecret && (
//         <Elements stripe={stripePromise} options={options}>
//           <DonationForm />
//         </Elements>
//       )}
//     </div>
//   );
// }

import React from 'react';
import { NextPage } from 'next';
import { Footer, Section } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { APP_ROUTES } from '@/common';

const DonatePage: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary">
      <Link href={APP_ROUTES.home.path}>
        <Image
          height={100}
          width={240}
          src="/logo.svg"
          alt="ISC Fund"
          className="w-60 py-8"
          priority
        />
      </Link>
      <Section className="grid items-center md:grid-cols-2">
        <Image
          src="/images/kid-2.png"
          width={300}
          height={300}
          className="mx-auto mb-6 h-auto max-h-[40vh] w-auto max-w-52 md:max-h-full md:max-w-full"
          alt="Save a child"
        />
        <div>
          <h2 className="text-white">Your donation can save lives.</h2>
          <h4 className="mb-8 text-white">
            Join the fight against sickle cell disease – the most common genetic disorder in the
            world.
          </h4>
          <h3 className="text-white">Make a donation today</h3>
          <p className="text-white">Online donations will be available soon.</p>
          <p className="text-white">
            In the meantime, you can support us by making a direct bank transfer to our endowment
            account:
          </p>
          <p className="font-semibold uppercase text-white">Bank details</p>
          <p className="text-white">
            Domiciliation: <span className="font-bold text-white">BRED PARIS AGENCE RAPEE</span>
          </p>
          <p className="mb-8 text-white">
            International Bank Account Number (IBAN):{' '}
            <span className="font-bold text-white">FR76 1010 7001 1800 1260 5180 392</span>.
          </p>
          <h3 className="text-white">Prefer to speak with us?</h3>
          <p className="text-white">
            For more donation options or to request a receipt, please feel free to contact:
          </p>
          <p className="font-bold text-white">Emmanuel Jayr </p>
          <p className="text-white">Co-founder & Treasurer – ISC Fund</p>
          <p className="mb-8 text-white">
            <Link href="mailto:manujayr@gmail.com" className="underline">
              manujayr@gmail.com
            </Link>
          </p>
          <h3 className="text-white">Thank you for your support</h3>
          <p className="text-white">
            Every donation brings us closer to a world where sickle cell disease no longer takes
            lives.
          </p>
        </div>
      </Section>
      <Footer />
    </div>
  );
};

export default DonatePage;
