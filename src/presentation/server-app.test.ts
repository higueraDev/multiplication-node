import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";

const options = {
	base: 2,
	limit: 3,
	showTable: true,
	fileName: "test-table",
	destination: "outputs/test-destination",
};

const logSpy = jest.spyOn(console, "log");
logSpy.mockImplementation(() => {});

const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
const tableContent = "test-content";
createTableSpy.mockReturnValue(tableContent);

const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");

describe("server-app", () => {
	test("should create ServerApp instance", () => {
		const serverApp = new ServerApp();
		expect(serverApp).toBeInstanceOf(ServerApp);
	});
	test("should have a run static method", () => {
		expect(typeof ServerApp.run).toBe("function");
	});
	test("should run ServerApp with provided options", () => {
		saveFileSpy.mockReturnValueOnce(true);
		ServerApp.run(options);

		expect(logSpy).toHaveBeenCalledWith("server running...");
		expect(createTableSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				base: options.base,
				limit: options.limit,
			})
		);
		expect(logSpy).toHaveBeenCalledWith(tableContent);
		expect(saveFileSpy).toHaveBeenCalledWith({
			fileContent: tableContent,
			destination: options.destination,
			fileName: options.fileName,
		});
		expect(logSpy).toHaveBeenCalledWith("File created! :)");
	});
	test("should log an exception on saving file failure", () => {
		saveFileSpy.mockReturnValueOnce(false);
		ServerApp.run(options);
		expect(logSpy).toHaveBeenCalledWith("Something went wrong :(");
	});
});
