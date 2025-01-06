import { mkdirSync, writeFileSync } from "fs";

interface Options {
	fileContent: string;
	destination?: string;
	fileName?: string;
}

export interface SaveFileUseCase {
	execute: (options: Options) => boolean;
}

export class SaveFile implements SaveFileUseCase {
	constructor() {}
	execute({
		fileContent,
		destination = "outputs",
		fileName = "table",
	}: Options) {
		try {
			mkdirSync(destination, { recursive: true });
			writeFileSync(`${destination}/${fileName}.txt`, fileContent);
			return true;
		} catch {
			console.warn("File Created!");
			return false;
		}
	}
}
