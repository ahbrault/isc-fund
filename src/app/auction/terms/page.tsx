import React from 'react';
import type { Metadata } from 'next';
import { Section } from '@/components';

export const metadata: Metadata = {
  title: 'Auction Terms & Conditions — ISC Fund',
  description:
    'Rules, bidding conditions and tax benefits for the ISC Fund charity auction.',
  alternates: { canonical: '/auction/terms' },
};

export default function AuctionTermsPage() {
  return (
    <Section className="py-16 md:py-20">
      <article className="prose mx-auto max-w-3xl text-gray-800">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
          Auction Terms &amp; Conditions
        </h1>

        <p className="mb-4 leading-relaxed">
          Pre-bids are accepted on all lots until 16 July 2026 at 6:00 PM (CET). Each bid must
          include the lot name, lot number, the bidder&apos;s full name, phone number and postal
          address, and the maximum offer amount in euros.
        </p>

        <p className="mb-4 leading-relaxed">
          All bids are legally binding and irrevocable. The highest bid at the close of the auction
          determines the winner, as assessed by ISCF. Payment is due immediately upon winning.
        </p>

        <p className="mb-4 leading-relaxed">
          All lots are sold &quot;as is&quot;, without warranty as to description, authenticity or
          value. All sales are final — no refunds or exchanges. Buyers are responsible for
          applicable taxes and any shipping costs outside Saint-Tropez. Experience-based lots
          (travel, events) are subject to availability; ISCF accepts no liability for force majeure
          or logistical delays.
        </p>

        <h2 className="mb-4 mt-10 text-2xl font-semibold text-gray-900">
          Tax Benefits for Donors — Articles 200 &amp; 238 bis of the French General Tax Code
        </h2>

        <p className="mb-4 leading-relaxed">
          All auction purchases qualify as charitable donations to ISCF, a French
          general-interest endowment fund (fonds de dotation). A tax receipt (Cerfa no. 11580 or
          equivalent) is issued upon request.
        </p>

        <ul className="mb-4 list-disc space-y-2 pl-6 leading-relaxed">
          <li>
            Individuals: 66% income-tax reduction on the donated amount (ceiling: 20% of taxable
            income; excess carried forward 5 years).
          </li>
          <li>
            Companies: 60% corporate-tax reduction (ceiling: €20,000 or 0.5‰ of pre-tax turnover;
            excess carried forward 5 years).
          </li>
        </ul>

        <p className="mb-4 leading-relaxed">
          International donors: EU/UK — tax receipts via the Transnational Giving Europe (TGE)
          network. USA — arrangements via a 501(c)(3) partner on request. UAE — contributions
          qualify as CSR/ESG philanthropy.
        </p>

        <hr className="my-8 border-gray-200" />

        <p className="text-center text-sm text-gray-500">
          ISCF · French endowment fund · 9 rue du Lunain, 75014 Paris · IBAN: FR76 1010 7001 1800
          1260 5180 392 · www.iscfund.com/donate
        </p>
      </article>
    </Section>
  );
}
