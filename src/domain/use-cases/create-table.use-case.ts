interface CreateTableOptions {
	base: number;
	limit: number;
	header?: string;
}

export interface CreateTableUseCase {
	execute: (options: CreateTableOptions) => string;
}

export class CreateTable implements CreateTableUseCase {
	constructor() {}
	execute({ base, limit, header = "" }: CreateTableOptions) {
		let table = `${header}`;

		for (let i = 1; i <= limit; i++) {
			const line = `${base} x ${i} = ${base * i}\n`;
			table += line;
		}
		return table;
	}
}
