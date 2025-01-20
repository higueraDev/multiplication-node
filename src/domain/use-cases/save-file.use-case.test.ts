import fs, { existsSync, readFileSync, rmSync } from "fs";
import { SaveFile } from "./save-file.use-case";

// this is necessary to avoid the noisy warning during testing
const consoleSpy = jest.spyOn(console, "warn");
consoleSpy.mockImplementation(() => {});

describe("save-file.use-case", () => {
	const options = {
		fileContent: "test-content",
		destination: "outputs/test-destination",
		fileName: "test-filename",
	};
	const filePath = `${options.destination}/${options.fileName}.txt`;

	beforeEach(() => {
		const fileExists = existsSync("outputs");
		if (fileExists) rmSync("outputs", { recursive: true });
	});

	afterAll(() => {
		consoleSpy.mockRestore();
	});

	test("should save file with default values", () => {
		const saveFile = new SaveFile();
		const options = { fileContent: "test-content" };
		const filePath = "outputs/table.txt";

		const result = saveFile.execute(options);
		expect(result).toBe(true);

		const fileExists = existsSync(filePath);
		expect(fileExists).toBe(true);

		const fileContent = readFileSync(filePath, { encoding: "utf-8" });
		expect(fileContent).toBe(options.fileContent);
	});

	test("should save file with custom values", () => {
		const saveFile = new SaveFile();

		saveFile.execute(options);

		const fileContent = readFileSync(filePath, { encoding: "utf-8" });
		expect(fileContent).toBe(options.fileContent);
	});

	test("should return false and should show a warning wether the directory was not created", () => {
		const saveFile = new SaveFile();
		const mkdirSyncSpy = jest.spyOn(fs, "mkdirSync");
		mkdirSyncSpy.mockImplementation(() => {
			throw new Error();
		});

		const result = saveFile.execute(options);
		expect(result).toBe(false);
		expect(consoleSpy).toHaveBeenCalled();

		// restoring spy's to their original implementation
		mkdirSyncSpy.mockRestore();
	});

	test("should return false and should show a warning wether the directory was not created", () => {
		const saveFile = new SaveFile();
		const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");
		writeFileSyncSpy.mockImplementation(() => {
			throw new Error();
		});

		const result = saveFile.execute(options);
		expect(result).toBe(false);
		expect(consoleSpy).toHaveBeenCalled();

		// restoring spy's to their original implementation
		writeFileSyncSpy.mockRestore();

		rmSync("outputs", { recursive: true });
	});
});
