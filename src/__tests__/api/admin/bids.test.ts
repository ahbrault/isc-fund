import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * The handler imports `{ prisma } from '@/common'` (re-exported from
 * src/common/config/prisma.ts). We mock the WHOLE barrel so we never touch a
 * real DB and so importing the barrel doesn't drag in unrelated modules.
 */
const { createMock, findManyMock } = vi.hoisted(() => ({
  createMock: vi.fn(),
  findManyMock: vi.fn(),
}));

vi.mock('@/common', () => ({
  prisma: {
    bid: {
      create: createMock,
      findMany: findManyMock,
    },
  },
}));

// Imported AFTER the mock is registered.
import handler from '@/pages/api/admin/bids';

type MockRes = NextApiResponse & {
  _status: number;
  _json: any;
  _ended: boolean;
  _headers: Record<string, any>;
};

function buildReqRes(method: string, body?: any) {
  const req = { method, body } as unknown as NextApiRequest;

  const res = {
    _status: 0,
    _json: undefined,
    _ended: false,
    _headers: {},
    status(code: number) {
      this._status = code;
      return this;
    },
    json(payload: any) {
      this._json = payload;
      return this;
    },
    end(_msg?: string) {
      this._ended = true;
      return this;
    },
    setHeader(key: string, value: any) {
      this._headers[key] = value;
      return this;
    },
  } as unknown as MockRes;

  return { req, res };
}

const VALID_BODY = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+15551234567',
  amount: 100,
  metadata: { lot_id: 7, lot_title: 'Lot Seven' },
};

beforeEach(() => {
  createMock.mockReset();
  findManyMock.mockReset();
  createMock.mockResolvedValue({ id: 'test-id' });
  findManyMock.mockResolvedValue([
    {
      id: 'b1',
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+15551234567',
      amount: 100,
      lotId: 7,
      lotTitle: 'Lot Seven',
      createdAt: new Date('2026-01-01T00:00:00Z'),
    },
  ]);
});

describe('POST /api/admin/bids — valid body', () => {
  it('creates a bid and returns its id with a 2xx status', async () => {
    const { req, res } = buildReqRes('POST', VALID_BODY);
    await handler(req, res);

    expect(res._status).toBeGreaterThanOrEqual(200);
    expect(res._status).toBeLessThan(300);
    expect(res._json).toEqual({ id: 'test-id' });
  });

  it('maps body fields to prisma create (fullName/lotId/lotTitle)', async () => {
    const { req, res } = buildReqRes('POST', VALID_BODY);
    await handler(req, res);

    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith({
      data: {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+15551234567',
        amount: 100,
        lotId: 7,
        lotTitle: 'Lot Seven',
      },
    });
  });
});

describe('POST /api/admin/bids — invalid bodies must be rejected with 400', () => {
  it('rejects amount = 0', async () => {
    const { req, res } = buildReqRes('POST', { ...VALID_BODY, amount: 0 });
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(res._json).toHaveProperty('error');
    expect(createMock).not.toHaveBeenCalled();
  });

  it('rejects negative amount', async () => {
    const { req, res } = buildReqRes('POST', { ...VALID_BODY, amount: -5 });
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(createMock).not.toHaveBeenCalled();
  });

  it('rejects non-integer amount', async () => {
    const { req, res } = buildReqRes('POST', { ...VALID_BODY, amount: 12.5 });
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(createMock).not.toHaveBeenCalled();
  });

  it('rejects malformed email', async () => {
    const { req, res } = buildReqRes('POST', { ...VALID_BODY, email: 'notanemail' });
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(createMock).not.toHaveBeenCalled();
  });

  it('rejects missing metadata.lot_id', async () => {
    const { req, res } = buildReqRes('POST', {
      ...VALID_BODY,
      metadata: { lot_title: 'Lot Seven' },
    });
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(createMock).not.toHaveBeenCalled();
  });

  it('rejects missing name', async () => {
    const { name, ...rest } = VALID_BODY;
    const { req, res } = buildReqRes('POST', rest);
    await handler(req, res);
    expect(res._status).toBe(400);
    expect(createMock).not.toHaveBeenCalled();
  });
});

describe('GET /api/admin/bids', () => {
  it('returns items ordered by createdAt desc', async () => {
    const { req, res } = buildReqRes('GET');
    await handler(req, res);

    expect(res._status).toBe(200);
    expect(res._json).toHaveProperty('items');
    expect(res._json.items).toHaveLength(1);
    expect(res._json.items[0].id).toBe('b1');

    expect(findManyMock).toHaveBeenCalledTimes(1);
    expect(findManyMock).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { createdAt: 'desc' } })
    );
  });
});

describe('Unsupported methods', () => {
  it('returns 405 for PUT', async () => {
    const { req, res } = buildReqRes('PUT', VALID_BODY);
    await handler(req, res);
    expect(res._status).toBe(405);
    expect(createMock).not.toHaveBeenCalled();
  });
});
