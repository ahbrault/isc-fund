import { z } from 'zod';
import type { Lot } from '@/common/@types/Lot.type';
import type { Catalog } from '@/common/@types/Catalog.type';

/**
 * Schema for a single auction/lottery lot.
 *
 * Required, strictly-validated fields: id, lotNumber (positive ints),
 * title (non-empty), type (enum). All descriptive/optional fields are kept
 * permissive on purpose so the schema accepts the real V5 data without
 * over-constraining content that may still change before the final PDF.
 */
export const lotSchema = z.object({
  id: z.number().int().positive(),
  lotNumber: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string(),
  shortDescription: z.string().optional(),
  image: z.string(),
  type: z.enum(['auction', 'lottery']),
  reserve: z.boolean().optional(),
  reservePrice: z.number().optional(),
  ticketPrice: z.number().optional(),
  video: z.string().optional(),
  includes: z.array(z.string()).optional(),
  chapter: z.string().optional(),
  catalogPage: z.number().int().positive().optional(),
});

export const lotsSchema = z.array(lotSchema);

export const catalogPageKindSchema = z.enum(['cover', 'chapter', 'lot', 'rules']);

export const catalogPageSchema = z.object({
  pageIndex: z.number().int().positive(),
  image: z.string(),
  kind: catalogPageKindSchema,
  lotId: z.number().int().positive().optional(),
});

export const catalogSchema = z.object({
  pages: z.array(catalogPageSchema),
});

export function parseLots(json: unknown): Lot[] {
  return lotsSchema.parse(json) as Lot[];
}

export function parseCatalog(json: unknown): Catalog {
  return catalogSchema.parse(json) as Catalog;
}
