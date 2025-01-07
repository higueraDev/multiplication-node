import { CreateTable } from "./create-table.use-case";

describe("create-table.use-case", () => {
	test("should create table with default values", () => {
		const base = 5;
		const createTable = new CreateTable();
		const table = createTable.execute({ base });
		expect(table).toContain(`${base} x 10`);
	});

	test("should create table with custom values", () => {
		const base = 5,
			limit = 10,
			header = "customHeader\n";
		const createTable = new CreateTable();

		const table = createTable.execute({ base, limit, header });

		expect(table).toContain(`${header}`);
		expect(table).toContain(`${base} x ${limit}`);
	});

	test("should create table rows based on limit", () => {
		const base = 5,
			limit = 3;
		const createTable = new CreateTable();
		const table = createTable.execute({ base, limit });
		const rows = table.split("\n");
		expect(rows).toHaveLength(limit);
		expect(table).not.toContain(`${base} x ${limit + 1}`);
	});
});
