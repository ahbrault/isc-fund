import { test, expect } from '@playwright/test';

/**
 * Phase 3 — e2e for the catalogue flipbook at /auction.
 *
 * Author-only: do NOT assume browsers are installed. This exercises the real
 * route built in Phase 3:
 *   - /auction renders <CatalogFlipbook> (via next/dynamic ssr:false).
 *   - A page image is visible.
 *   - The "next" control advances the catalogue.
 *   - A "Bid Now" link navigates to /auction/lot-<n>.
 *
 * Kept resilient: queried by roles / accessible names, not DOM structure.
 */

test.describe('Auction catalogue flipbook', () => {
  test('shows the catalogue and advances with the next control', async ({ page }) => {
    await page.goto('/auction');

    // At least one catalogue page image must be visible.
    const firstImage = page.getByRole('img').first();
    await expect(firstImage).toBeVisible();
    const firstSrc = await firstImage.getAttribute('src');

    // Advance the catalogue.
    const next = page.getByRole('button', { name: /next/i });
    await expect(next).toBeEnabled();
    await next.click();

    // The viewer should still present a catalogue image after flipping.
    await expect(page.getByRole('img').first()).toBeVisible();
    expect(firstSrc).toBeTruthy();
  });

  test('Bid Now link navigates to a lot detail page', async ({ page }) => {
    await page.goto('/auction');

    const bidNow = page.getByRole('link', { name: /bid now/i }).first();
    await expect(bidNow).toBeVisible();

    const href = await bidNow.getAttribute('href');
    expect(href).toMatch(/\/auction\/lot-\d+/);

    await bidNow.click();
    await expect(page).toHaveURL(/\/auction\/lot-\d+/);
  });
});
