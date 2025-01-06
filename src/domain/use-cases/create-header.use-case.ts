export interface CreateHeaderUseCase {
	execute: (base: number) => string;
}

export class CreateHeader implements CreateHeaderUseCase {
	constructor() {}

	execute(base: number) {
		return this.#formatHeader(base);
	}

	#formatHeader(base: number): string {
		return [
			"============================",
			` Multiplication table of ${base} `,
			"============================",
			"",
		].join("\n");
	}
}
