const originalArv = process.argv;
const runCommand = async (_args: string[]) => {
	process.argv = [...originalArv, ..._args];

	const { args } = await import("./args.plugin");
	return args;
};

describe("args.plugin", () => {
	test("should return default values", async () => {
		const args = await runCommand(["-b", "5"]);
		expect(args()).toEqual(
			expect.objectContaining({
				b: 5,
				l: 10,
				s: false,
				n: "table",
				d: "outputs",
			})
		);
	});

	test("should return config with custom values", async () => {
		const args = await runCommand([
			"-b",
			"10",
			"-l",
			"1",
			"-s",
			"-n",
			"test-name",
			"-d",
			"test-outputs",
		]);
		expect(args()).toEqual(
			expect.objectContaining({
				b: 10,
				l: 1,
				s: true,
				n: "test-name",
				d: "test-outputs",
			})
		);
	});
});
