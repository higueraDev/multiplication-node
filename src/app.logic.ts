import { mkdirSync, writeFileSync } from "fs";
import { args } from "./config/plugins/args.plugin";

const { b, l, s } = args();

const base = b;
const limit = l;
const showInConsole = s;

const header = `
===========================
 Multiplication table of ${base} 
===========================
`;

let table = `${header}`;

for (let i = 1; i <= limit; i++) {
	const line = `${base} x ${i} = ${base * i}\n`;
	table += line;
}

const filePath = "outputs";

mkdirSync(filePath, { recursive: true });
writeFileSync(`outputs/table-${base}.txt`, table);

if (showInConsole) console.log(table);
