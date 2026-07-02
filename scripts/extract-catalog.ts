/**
 * extract-catalog.ts — Catalogue extraction pipeline (idempotent, re-runnable).
 *
 * Renders every page of the auction-preview PDF to a web-optimised WebP image
 * and (re)generates `public/data/catalog.json` from the current
 * `public/data/lots.json`.
 *
 * The source PDF is NOT served to the client — only the rendered WebP pages
 * (public/images/catalog/page-NN.webp) and the derived catalog.json are.
 *
 * ── REGENERATION PROCEDURE WHEN THE FINAL PDF ARRIVES ─────────────────────────
 *   1. Drop the new PDF at the repo root using the same name
 *      ("AUCTION PREVIEW V5.pdf"), OR pass its path as an argument:
 *        pnpm tsx scripts/extract-catalog.ts "path/to/FINAL.pdf"
 *   2. Run the pipeline:
 *        pnpm tsx scripts/extract-catalog.ts
 *   3. Re-review public/data/lots.json against the new PDF (titles, descriptions,
 *      `includes`, `catalogPage`, the page-kind mapping, chapters).
 *      NOTE: lot 14 ("Loewe x David Guetta — Headphones") `includes` is
 *      PROVISIONAL — the V5 PDF listed a placeholder ("texte"). Confirm the
 *      real contents against the final PDF.
 *   4. Validate end-to-end:
 *        pnpm test && pnpm e2e
 *
 * Requires the poppler (`pdftoppm`) and webp (`cwebp`) CLIs on PATH.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type { Catalog, CatalogPage, CatalogPageKind } from '../src/common/@types/Catalog.type';
import type { Lot } from '../src/common/@types/Lot.type';

const REPO_ROOT = process.cwd();
const DEFAULT_PDF = 'AUCTION PREVIEW V5.pdf';
const COVER_PAGE = 1;
const RULES_PAGE = 23;

const RENDER_DPI = 300;
const WEBP_QUALITY = 90;
const WEBP_RESIZE_WIDTH = 2600;

const OUTPUT_IMAGE_DIR = path.join(REPO_ROOT, 'public', 'images', 'catalog');
const LOTS_JSON_PATH = path.join(REPO_ROOT, 'public', 'data', 'lots.json');
const CATALOG_JSON_PATH = path.join(REPO_ROOT, 'public', 'data', 'catalog.json');

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

function getPageCount(pdfPath: string): number {
  let output: string;
  try {
    output = execFileSync('pdfinfo', [pdfPath], { encoding: 'utf-8' });
  } catch (err) {
    throw new Error(
      `pdfinfo failed for "${pdfPath}" (is poppler installed?): ${(err as Error).message}`
    );
  }
  const match = output.match(/^Pages:\s+(\d+)/m);
  if (!match) {
    throw new Error(`Could not parse "Pages:" from pdfinfo output for "${pdfPath}"`);
  }
  return parseInt(match[1], 10);
}

function renderPages(pdfPath: string, totalPages: number): void {
  fs.mkdirSync(OUTPUT_IMAGE_DIR, { recursive: true });
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'isc-catalog-'));

  try {
    for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
      const pngPrefix = path.join(tmpDir, 'page');

      // Render this single page to PNG via poppler.
      execFileSync('pdftoppm', [
        '-png',
        '-r',
        String(RENDER_DPI),
        '-f',
        String(pageIndex),
        '-l',
        String(pageIndex),
        pdfPath,
        pngPrefix,
      ]);

      // pdftoppm names single-page output like page-NN.png (zero-padded to the
      // PDF page-count width). Find whatever PNG it produced this round.
      const png = fs
        .readdirSync(tmpDir)
        .filter(f => f.endsWith('.png'))
        .map(f => path.join(tmpDir, f))[0];

      if (!png) {
        throw new Error(`pdftoppm produced no PNG for page ${pageIndex}`);
      }

      const outWebp = path.join(OUTPUT_IMAGE_DIR, `page-${pad2(pageIndex)}.webp`);
      execFileSync('cwebp', [
        '-q',
        String(WEBP_QUALITY),
        '-resize',
        String(WEBP_RESIZE_WIDTH),
        '0',
        png,
        '-o',
        outWebp,
      ]);

      // Clean the PNG before the next page so the directory only ever holds one.
      fs.rmSync(png, { force: true });
      process.stdout.write(`  rendered page ${pad2(pageIndex)} -> ${path.basename(outWebp)}\n`);
    }
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

function buildCatalog(lots: Lot[], totalPages: number): Catalog {
  // Map each 1-based catalog page to the lot that lives on it.
  const lotByPage = new Map<number, Lot>();
  for (const lot of lots) {
    if (typeof lot.catalogPage === 'number') {
      const existing = lotByPage.get(lot.catalogPage);
      if (existing) {
        throw new Error(
          `Duplicate catalogPage ${lot.catalogPage}: lots "${existing.id}" and "${lot.id}" both claim it`
        );
      }
      lotByPage.set(lot.catalogPage, lot);
    }
  }

  const pages: CatalogPage[] = [];
  for (let pageIndex = 1; pageIndex <= totalPages; pageIndex++) {
    const lot = lotByPage.get(pageIndex);

    let kind: CatalogPageKind;
    if (pageIndex === COVER_PAGE) {
      kind = 'cover';
    } else if (pageIndex === RULES_PAGE) {
      kind = 'rules';
    } else if (lot) {
      kind = 'lot';
    } else {
      kind = 'chapter';
    }

    const page: CatalogPage = {
      pageIndex,
      image: `/images/catalog/page-${pad2(pageIndex)}.webp`,
      kind,
    };
    if (kind === 'lot' && lot) {
      page.lotId = lot.id;
    }
    pages.push(page);
  }

  pages.sort((a, b) => a.pageIndex - b.pageIndex);
  return { pages };
}

function main(): void {
  const pdfArg = process.argv[2] ?? DEFAULT_PDF;
  const pdfPath = path.isAbsolute(pdfArg) ? pdfArg : path.join(REPO_ROOT, pdfArg);

  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Source PDF not found: ${pdfPath}`);
  }

  const totalPages = getPageCount(pdfPath);
  console.log(`Rendering ${totalPages} pages from "${path.basename(pdfPath)}"...`);
  renderPages(pdfPath, totalPages);

  console.log('Building catalog.json from lots.json...');
  const lots: Lot[] = JSON.parse(fs.readFileSync(LOTS_JSON_PATH, 'utf-8'));
  const catalog = buildCatalog(lots, totalPages);
  fs.writeFileSync(CATALOG_JSON_PATH, `${JSON.stringify(catalog, null, 2)}\n`, 'utf-8');

  console.log(
    `Done. ${catalog.pages.length} pages written to catalog.json; ` +
      `${catalog.pages.filter(p => p.kind === 'lot').length} lot pages.`
  );
}

main();
