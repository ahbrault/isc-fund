import { z } from 'zod';

/**
 * Validation schema for an incoming bid request (POST /api/admin/bids).
 */
export const bidRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  amount: z.number().int().min(1),
  metadata: z.object({
    lot_id: z.number().int().min(1),
    lot_title: z.string().min(1),
  }),
});

export type BidRequest = z.infer<typeof bidRequestSchema>;
