import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <rect width="128" height="128" fill="#0F1219"/>
  <path fill="#FFFFFF" d="M14 34h44v14H28v12h30v34H14V80h30V68H14V34Z"/>
  <path fill="#FFFFFF" d="M66 34h14v26h20V34h14v60h-14V74H80v20H66V34Z"/>
</svg>`;

const sizes = [16, 32, 48, 64, 128, 256];
const pngs = [];
for (const size of sizes) {
	pngs.push(await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer());
}

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);

const entries = [];
let offset = 6 + sizes.length * 16;
for (let i = 0; i < sizes.length; i++) {
	const entry = Buffer.alloc(16);
	entry.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 0);
	entry.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 1);
	entry.writeUInt8(0, 2);
	entry.writeUInt8(0, 3);
	entry.writeUInt16LE(1, 4);
	entry.writeUInt16LE(32, 6);
	entry.writeUInt32LE(pngs[i].length, 8);
	entry.writeUInt32LE(offset, 12);
	entries.push(entry);
	offset += pngs[i].length;
}

writeFileSync('public/favicon.ico', Buffer.concat([header, ...entries, ...pngs]));
console.log('favicon.ico written:', offset, 'bytes');
