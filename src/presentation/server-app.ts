import { CreateHeader } from "../domain/use-cases/create-header.use-case";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

export interface RunOptions {
	base: number;
	limit: number;
	showTable: boolean;
	destination: string;
	fileName: string;
}

export class ServerApp {
	static run({ base, limit, showTable, destination, fileName }: RunOptions) {
		console.log("server running...");

		const tableObj = new CreateTable();
		const header = new CreateHeader().execute(base);
		const table = tableObj.execute({ base, limit, header });
		if (showTable) console.log(table);

		const fileCreated = new SaveFile().execute({
			fileContent: table,
			destination,
			fileName,
		});

		const message = fileCreated
			? "File created! :)"
			: "Something went wrong :(";

		console.log(message);
	}
}
