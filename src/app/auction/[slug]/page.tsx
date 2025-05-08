import { notFound } from 'next/navigation';
import Image from 'next/image';
import path from 'path';
import fs from 'fs/promises';
import { APP_ROUTES, Lot } from '@/common';
import Link from 'next/link';
import AuctionLotClient from './AuctionLotClient';
import React from 'react';

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'lots.json');
  const json = await fs.readFile(filePath, 'utf-8');
  const lots: Lot[] = JSON.parse(json);

  return lots.map(lot => ({
    slug: `lot-${lot.id}`,
  }));
}

async function getLotBySlug(slug: string): Promise<Lot | null> {
  const filePath = path.join(process.cwd(), 'public', 'data', 'lots.json');
  const json = await fs.readFile(filePath, 'utf-8');
  const lots: Lot[] = JSON.parse(json);

  const id = parseInt(slug.replace('lot-', ''));
  return lots.find(lot => lot.id === id) || null;
}

export default async function AuctionLotPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lot = await getLotBySlug(slug);
  if (!lot) return notFound();

  return (
    <div className="mx-auto mt-8 min-h-screen w-full max-w-xl space-y-6 px-4 py-10">
      <Link href={APP_ROUTES.home.path}>
        <Image
          height={100}
          width={240}
          src="/logo-icon-indigo.svg"
          alt="ISC Fund"
          className="mx-auto mb-4 h-12"
          priority
        />
      </Link>
      <Image
        src={lot.image}
        alt={lot.title}
        width={800}
        height={400}
        className="mx-auto mb-8 rounded-md object-cover"
      />

      <div className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">{lot.title}</h1>

        {/* Badge */}
        <span
          className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
            lot.type === 'auction' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {lot.type === 'auction'
            ? lot.reserve
              ? 'AUCTION – WITH RESERVE'
              : 'AUCTION – NO RESERVE'
            : `LOTTERY – $${lot.ticketPrice} TICKET`}
        </span>

        {/* Starting Bid */}
        {lot.type === 'auction' && lot.reserve && lot.reservePrice && (
          <p className="text-sm font-semibold text-gray-900">
            Starting Bid: ${lot.reservePrice.toLocaleString()}
          </p>
        )}
      </div>

      <p className="mb-8 text-gray-700">{lot.description}</p>

      {lot.video && (
        <video controls preload="none" width="100%" height="auto">
          <source src={lot.video} type="video/mp4" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      )}

      <AuctionLotClient lot={lot} />

      <p className="mt-6 text-xs italic text-gray-500">
        {lot.type !== 'lottery' &&
          '*Each participant acknowledges that if they win the bid, they commit to donating the amount of their offer on the website www.ISCFund.com.'}
      </p>

      <Link
        href={`${APP_ROUTES.home.path}#auction-section`}
        className="mt-6 inline-block text-sm font-semibold text-indigo-600 hover:underline"
      >
        ← Back to catalog
      </Link>
    </div>
  );
}
