import { ServerApp } from "./presentation/server-app";

describe("app.ts", () => {
	test("should call ServerApp with the default values", async () => {
		const serverRunMock = jest.fn();
		ServerApp.run = serverRunMock;
		process.argv = ["node", "app.ts", "-b", "10"];

		await import("./app");
		expect(serverRunMock).toHaveBeenCalledWith({
			base: 10,
			destination: "outputs",
			fileName: "table",
			limit: 10,
			showTable: false,
		});
	});
});
