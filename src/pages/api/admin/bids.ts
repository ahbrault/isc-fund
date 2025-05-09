// pages/api/admin/bids.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/common';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const bids = await prisma.bid.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json({ items: bids });
    } catch (err) {
      console.error('[FETCH_BIDS_ERROR]', err);
      return res.status(500).json({ error: 'Failed to fetch bids' });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;

      const bid = await prisma.bid.create({
        data: {
          fullName: body.name,
          email: body.email,
          phone: body.phone,
          amount: body.amount,
          lotId: body.metadata.lot_id,
          lotTitle: body.metadata.lot_title,
        },
      });

      return res.status(200).json({ id: bid.id });
    } catch (err) {
      console.error('[CREATE_BID_ERROR]', err);
      return res.status(500).json({ error: 'Failed to create bid' });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
