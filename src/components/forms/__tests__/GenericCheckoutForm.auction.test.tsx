import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * The component imports several things from the `@/common` barrel. We keep the
 * real exports (APP_ROUTES, types, etc.) and only override the storage helpers
 * so nothing touches localStorage in surprising ways and we can assert on the
 * bid-save call.
 */
const {
  saveDonorBidInfoMock,
  retrieveDonorBidInfoMock,
  retrieveDonorInfoMock,
  clearDonorBidInfoMock,
  saveDonorInfoMock,
} = vi.hoisted(() => ({
  saveDonorBidInfoMock: vi.fn(),
  retrieveDonorBidInfoMock: vi.fn(() => null),
  retrieveDonorInfoMock: vi.fn(() => null),
  clearDonorBidInfoMock: vi.fn(),
  saveDonorInfoMock: vi.fn(),
}));

vi.mock('@/common', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/common')>();
  return {
    ...actual,
    saveDonorBidInfo: saveDonorBidInfoMock,
    retrieveDonorBidInfo: retrieveDonorBidInfoMock,
    retrieveDonorInfo: retrieveDonorInfoMock,
    clearDonorBidInfo: clearDonorBidInfoMock,
    saveDonorInfo: saveDonorInfoMock,
  };
});

import GenericCheckoutForm from '../GenericCheckoutForm';

const baseProps = {
  onClientSecret: vi.fn(),
  onSummary: vi.fn(),
  label: 'Lot Seven',
};

let fetchMock: ReturnType<typeof vi.fn>;
let originalLocation: Location;

beforeEach(() => {
  vi.clearAllMocks();
  retrieveDonorBidInfoMock.mockReturnValue(null);
  retrieveDonorInfoMock.mockReturnValue(null);

  fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: 'b1', clientSecret: 'cs_test' }),
  });
  vi.stubGlobal('fetch', fetchMock);

  // jsdom does not implement navigation; replace location so we can read href.
  originalLocation = window.location;
  // @ts-expect-error override read-only location for the test
  delete window.location;
  // @ts-expect-error minimal stub
  window.location = { href: '' };

  process.env.NEXT_PUBLIC_N8N_WEBHOOK = 'https://hook.example/x';
});

afterEach(() => {
  vi.unstubAllGlobals();
  // @ts-expect-error restore
  window.location = originalLocation;
});

async function fillContactFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByPlaceholderText(/jane doe/i), 'Jane Doe');
  await user.type(screen.getByPlaceholderText(/you@example.com/i), 'jane@example.com');
  await user.type(screen.getByPlaceholderText(/123-4567/i), '+15551234567');
  await user.type(screen.getByPlaceholderText(/enter amount/i), '100');
}

describe('GenericCheckoutForm — auction mode terms gate', () => {
  it('renders a terms acceptance checkbox', () => {
    render(<GenericCheckoutForm mode="auction" metadata={{ lot_id: 7, lot_title: 'X' }} {...baseProps} />);
    expect(screen.getByLabelText(/terms/i)).toBeInTheDocument();
    expect((screen.getByLabelText(/terms/i) as HTMLInputElement).type).toBe('checkbox');
  });

  it('renders a link to /auction/terms', () => {
    render(<GenericCheckoutForm mode="auction" metadata={{ lot_id: 7, lot_title: 'X' }} {...baseProps} />);
    const link = screen.getByRole('link', { name: /terms|rules/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('/auction/terms'));
  });

  it('disables the submit button until terms are accepted', async () => {
    const user = userEvent.setup();
    render(<GenericCheckoutForm mode="auction" metadata={{ lot_id: 7, lot_title: 'X' }} {...baseProps} />);

    const submit = screen.getByRole('button', { name: /place your bid/i });
    expect(submit).toBeDisabled();

    await user.click(screen.getByLabelText(/terms/i));
    expect(submit).toBeEnabled();
  });

  it('does not POST to the bids API when terms are not checked', async () => {
    const user = userEvent.setup();
    render(<GenericCheckoutForm mode="auction" metadata={{ lot_id: 7, lot_title: 'X' }} {...baseProps} />);

    await fillContactFields(user);
    // Intentionally do NOT check the terms box.
    await user.click(screen.getByRole('button', { name: /place your bid/i }));

    const bidCall = fetchMock.mock.calls.find(([url]) => String(url).includes('/api/admin/bids'));
    expect(bidCall).toBeUndefined();
    expect(saveDonorBidInfoMock).not.toHaveBeenCalled();
  });

  it('POSTs to /api/admin/bids and redirects with mode=bid once terms accepted', async () => {
    const user = userEvent.setup();
    render(<GenericCheckoutForm mode="auction" metadata={{ lot_id: 7, lot_title: 'X' }} {...baseProps} />);

    await fillContactFields(user);
    await user.click(screen.getByLabelText(/terms/i));
    await user.click(screen.getByRole('button', { name: /place your bid/i }));

    await waitFor(() => {
      const bidCall = fetchMock.mock.calls.find(([url]) => String(url).includes('/api/admin/bids'));
      expect(bidCall).toBeDefined();
    });

    await waitFor(() => {
      expect(window.location.href).toContain('mode=bid');
    });
    expect(saveDonorBidInfoMock).toHaveBeenCalled();
  });

  it('blocks submission on an invalid email', async () => {
    const user = userEvent.setup();
    render(<GenericCheckoutForm mode="auction" metadata={{ lot_id: 7, lot_title: 'X' }} {...baseProps} />);

    await user.type(screen.getByPlaceholderText(/jane doe/i), 'Jane Doe');
    await user.type(screen.getByPlaceholderText(/you@example.com/i), 'notanemail');
    await user.type(screen.getByPlaceholderText(/123-4567/i), '+15551234567');
    await user.type(screen.getByPlaceholderText(/enter amount/i), '100');
    await user.click(screen.getByLabelText(/terms/i));
    await user.click(screen.getByRole('button', { name: /place your bid/i }));

    const bidCall = fetchMock.mock.calls.find(([url]) => String(url).includes('/api/admin/bids'));
    expect(bidCall).toBeUndefined();
  });
});

describe('GenericCheckoutForm — donation mode regression (no terms gate)', () => {
  it('does not gate submission behind a terms checkbox', async () => {
    const user = userEvent.setup();
    render(<GenericCheckoutForm mode="donation" {...baseProps} />);

    // No terms checkbox in donation mode.
    expect(screen.queryByLabelText(/terms/i)).not.toBeInTheDocument();

    const submit = screen.getByRole('button', { name: /continue to payment/i });
    expect(submit).toBeEnabled();

    await user.type(screen.getByPlaceholderText(/jane doe/i), 'Jane Doe');
    await user.type(screen.getByPlaceholderText(/you@example.com/i), 'jane@example.com');
    await user.type(screen.getByPlaceholderText(/123-4567/i), '+15551234567');
    await user.type(screen.getByPlaceholderText(/enter amount/i), '100');
    await user.click(submit);

    await waitFor(() => {
      const piCall = fetchMock.mock.calls.find(([url]) =>
        String(url).includes('/api/create-payment-intent')
      );
      expect(piCall).toBeDefined();
    });
  });
});
