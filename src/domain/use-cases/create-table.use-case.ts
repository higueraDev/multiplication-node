interface CreateTableOptions {
	base: number;
	limit?: number;
	header?: string;
}

export interface CreateTableUseCase {
	execute: (options: CreateTableOptions) => string;
}

export class CreateTable implements CreateTableUseCase {
	constructor() {}
	execute({ base, limit = 10, header = "" }: CreateTableOptions) {
		let table = `${header}`;

		for (let i = 1; i <= limit; i++) {
			let line = `${base} x ${i} = ${base * i}`;
			const hasLineBreak = i !== limit;
			hasLineBreak && (line += "\n");
			table += line;
		}
		return table;
	}
}
