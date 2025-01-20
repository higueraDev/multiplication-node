import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const args = () => {
	return yargs(hideBin(process.argv))
		.option("b", {
			alias: "base",
			type: "number",
			demandOption: true,
			describe: "Multiplication table base",
		})
		.option("l", {
			alias: "limit",
			type: "number",
			default: 10,
			describe: "Multiplication table limit",
		})
		.option("s", {
			alias: "show",
			type: "boolean",
			default: false,
			describe: "show multiplication table",
		})
		.option("n", {
			alias: "name",
			type: "string",
			default: "table",
			describe: "File Name",
		})
		.option("d", {
			alias: "destination",
			type: "string",
			default: "outputs",
			describe: "File destination",
		})
		.check((argv, options) => {
			if (argv.b < 0) throw "Error: base must be a positive number";
			if (argv.l < 0) throw "Error: limit must be a positive number";
			return true;
		})
		.parseSync();
};
