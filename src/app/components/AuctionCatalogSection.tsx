'use client';

import React from 'react';
import Image from 'next/image';
import { Section } from '@/components';

export default function AuctionCatalogSection() {
  // const [lots, setLots] = useState<Lot[]>([]);

  // useEffect(() => {
  //   fetch('/data/lots.json')
  //     .then(res => res.json())
  //     .then(setLots)
  //     .catch(console.error);
  // }, []);

  return (
    <Section className="py-16" id="auction">
      <div className="mb-16 flex items-center justify-center gap-4">
        <Image
          src="/images/cathyguetta-logo-ambassador.png"
          width={500}
          height={200}
          className="mx-auto h-auto w-auto max-w-72 object-fill"
          alt="Cathy Guetta"
        />
      </div>
      {/*<h2 className="mb-8 text-center text-3xl font-bold">Auction & Lottery Catalog</h2>*/}
      {/*<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">*/}
      {/*  {lots.map(lot => (*/}
      {/*    <div*/}
      {/*      key={lot.id}*/}
      {/*      className="flex flex-col rounded-lg border border-gray-200 shadow-md transition hover:shadow-lg"*/}
      {/*    >*/}
      {/*      <Image*/}
      {/*        src={lot.image}*/}
      {/*        width={400}*/}
      {/*        height={320}*/}
      {/*        className="h-80 w-full rounded-t-lg object-cover"*/}
      {/*        alt={lot.title}*/}
      {/*      />*/}
      {/*      <div className="flex flex-1 flex-col justify-between p-4">*/}
      {/*        <div>*/}
      {/*          <span*/}
      {/*            className={`mb-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${*/}
      {/*              lot.type === 'auction'*/}
      {/*                ? 'bg-red-100 text-red-700'*/}
      {/*                : 'bg-yellow-100 text-yellow-800'*/}
      {/*            }`}*/}
      {/*          >*/}
      {/*            {lot.type === 'auction'*/}
      {/*              ? lot.reserve*/}
      {/*                ? 'AUCTION – WITH RESERVE'*/}
      {/*                : 'AUCTION – NO RESERVE'*/}
      {/*              : `LOTTERY – $${lot.ticketPrice} TICKET`}*/}
      {/*          </span>*/}

      {/*          <h3 className="text-lg font-semibold text-gray-900">{lot.title}</h3>*/}
      {/*          <p className="text-sm text-gray-600">{lot.shortDescription}</p>*/}

      {/*          {lot.type === 'auction' && lot.reserve && lot.reservePrice ? (*/}
      {/*            <p className="text-sm font-semibold text-gray-900">*/}
      {/*              Starting Bid: ${lot.reservePrice.toLocaleString()}*/}
      {/*            </p>*/}
      {/*          ) : lot.type === 'auction' && lot.reservePrice ? (*/}
      {/*            <p className="text-sm font-semibold text-gray-900">*/}
      {/*              Value: ${lot.reservePrice.toLocaleString()}*/}
      {/*            </p>*/}
      {/*          ) : (*/}
      {/*            <></>*/}
      {/*          )}*/}
      {/*        </div>*/}

      {/*        <Link*/}
      {/*          href={`/auction/lot-${lot.id}`}*/}
      {/*          className={`mt-4 w-full rounded-full px-4 py-2 text-center text-sm font-semibold text-white ${*/}
      {/*            lot.type === 'auction'*/}
      {/*              ? 'bg-secondary hover:bg-green-900'*/}
      {/*              : 'bg-primary hover:bg-amber-600'*/}
      {/*          }`}*/}
      {/*        >*/}
      {/*          {lot.type === 'auction' ? 'BID NOW' : 'BUY A TICKET'}*/}
      {/*        </Link>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex justify-center">
          <Image
            src="/images/cathy-guetta.jpg"
            width={500}
            height={200}
            className="mx-auto h-auto max-h-96 w-full object-contain"
            alt="Cathy Guetta"
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <h2 className="text-left">
            Cathy Guetta Named Ambassador for Sickle Cell Disease <br /> A New Light in the Fight
            for Life!
          </h2>
          <p>
            Cathy Guetta, the iconic Queen of the Night, is now turning her energy to a cause that
            desperately needs visibility: sickle cell disease. Named Ambassador for Sickle Cell
            Disease by the International Sickle Cell Fund (ISCF), Cathy brings star power and a
            fierce sense of purpose to this global fight.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 sm:mt-16">
          <p>
            Born in Dakar and raised in France, she’s joining forces with ISCF and the NGO Drep
            Afrique to champion the world’s most common genetic illness—one that claims nearly 1,000
            young lives every day, mostly in Africa, and primarily affects Black communities.
          </p>
          <p>
            With her new role, Cathy isn’t just lighting up nightlife—she’s igniting hope. She’s
            launching a series of fundraising events to support access to DREPAF, the only treatment
            proven to help children with severe forms of the disease, soon available at cost in
            Senegal. Her goal is crystal clear: to give every child a fighting chance to celebrate
            not just their fifth birthday, but a lifetime beyond.
          </p>
        </div>
        <div className="mt-16 flex items-center justify-center">
          <Image
            src="/images/events/nikki-beach.jpg"
            width={500}
            height={200}
            className="mx-auto h-auto w-auto max-w-96"
            alt="Cathy Guetta for Sickle Cell Disease"
          />
        </div>
      </div>
      {/*<div className="mt-16 flex items-center justify-center gap-4">*/}
      {/*  <Image*/}
      {/*    src="/images/cathyguetta-logo-ambassador.png"*/}
      {/*    width={500}*/}
      {/*    height={200}*/}
      {/*    className="mx-auto h-auto w-auto max-w-72"*/}
      {/*    alt="Cathy Guetta"*/}
      {/*  />*/}
      {/*</div>*/}
    </Section>
  );
}
