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
      {/*<div className="mb-16 flex items-center justify-center gap-4">*/}
      {/*  <Image*/}
      {/*    src="/images/cathyguetta-logo-ambassador.png"*/}
      {/*    width={500}*/}
      {/*    height={200}*/}
      {/*    className="mx-auto h-auto w-auto max-w-72 object-fill"*/}
      {/*    alt="Cathy Guetta"*/}
      {/*  />*/}
      {/*</div>*/}
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-16">
        <div className="order-2 flex flex-col items-center justify-center space-y-4 md:order-1">
          <h2 className="mb-0 text-left">
            Cathy Guetta Named Ambassador for Sickle Cell Disease <br /> A New Light in the Fight
            for Life!
          </h2>
          <p>
            <b>Cathy Guetta</b>, the iconic Queen of the Night and successful entrepreneur, is now
            channeling her boundless energy into a cause that urgently needs more visibility and
            funding: <b>sickle cell disease</b>.
          </p>
          <p>
            Recently named <b>Ambassador for Sickle Cell Disease</b> by the{' '}
            <b>International Sickle Cell Fund (ISCF)</b>, Cathy is bringing her trademark passion
            and drive to this global fight. Born in Dakar and raised in France, she’s not just
            lighting up her powerful network—she’s igniting hope.
          </p>
          <p>
            Cathy is launching a series of high-impact fundraising events in support of both{' '}
            <b>ISCF</b>
            and the NGO <b>Drep.Africa</b>, with a bold mission: to help save thousands of children
            suffering from severe forms of this disease.
          </p>
        </div>
        <div className="order-1 flex justify-center md:order-2">
          <Image
            src="/images/cathy-guetta.jpg"
            width={500}
            height={200}
            className="mx-auto h-auto max-h-96 w-full object-contain"
            alt="Cathy Guetta"
          />
        </div>
      </div>
      <div className="mt-24 flex items-center justify-center gap-4">
        <Image
          src="/images/cathyguetta-logo-ambassador.png"
          width={500}
          height={200}
          className="mx-auto h-auto w-auto max-w-72"
          alt="Cathy Guetta"
        />
      </div>
    </Section>
  );
}
