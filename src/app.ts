import { mkdirSync, writeFileSync } from "fs";

const base = 5;
const header = `
===========================
 Multiplication table of ${base} 
===========================
`;

let table = `${header}`;

for (let i = 1; i <= 10; i++) {
	const line = `${base} x ${i} = ${base * i}\n`;
	table += line;
}

const filePath = "outputs";

mkdirSync(filePath, { recursive: true });
writeFileSync(`outputs/table-${base}.txt`, table);

console.log(table);
