import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';
import { parse } from 'date-fns';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, 'data', 'All Bids.xlsx');

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets['Bid']; // ✅ Use the correct sheet
  if (!sheet) {
    console.error('❌ Sheet "Bid" not found');
    process.exit(1);
  }

  const rows = XLSX.utils.sheet_to_json(sheet) as any[];
  let count = 0;

  for (const row of rows) {
    const amount = parseFloat(row['Amount']);
    const lotId = parseInt(row['Lot ID']);
    const fullName = row['Full Name']?.trim();
    const email = row['Email']?.trim();
    const phone = row['Phone']?.replace(/^"|"$/g, '').trim();
    const lotTitle = row['Donation Type']?.trim();

    // Format: 2025-05-07 11:51:19 America/Los_Angeles -07:00 → parse date only
    const rawDate = row['Created At']?.split(' ')[0] + ' ' + row['Created At']?.split(' ')[1];
    const createdAt = parse(rawDate, 'yyyy-MM-dd HH:mm:ss', new Date());

    if (!amount || !lotId || !fullName || !email || isNaN(createdAt.getTime())) {
      console.warn(`Skipping invalid row: ${JSON.stringify(row)}`);
      continue;
    }

    try {
      await prisma.bid.create({
        data: {
          fullName,
          email,
          phone,
          lotId,
          lotTitle,
          amount,
          createdAt,
        },
      });
      count++;
    } catch (err) {
      console.error('❌ Error inserting row:', err);
    }
  }

  console.log(`✅ Imported ${count} bids`);
  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
