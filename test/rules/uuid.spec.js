"use strict";

const Validator = require("../../lib/validator");
const v = new Validator();

describe("Test rule: uuid", () => {

	it("should check type of value", () => {
		const check = v.compile({ $$root: true, type: "uuid" });
		let message = "The '' field must be a string.";

		expect(check(0)).toEqual([{ type: "string", actual: 0, message }]);
		expect(check(1)).toEqual([{ type: "string", actual: 1, message }]);
		expect(check([])).toEqual([{ type: "string", actual: [], message }]);
		expect(check({})).toEqual([{ type: "string", actual: {}, message }]);
		expect(check(false)).toEqual([{ type: "string", actual: false, message }]);
		expect(check(true)).toEqual([{ type: "string", actual: true, message }]);

		message = "The '' field must be a valid UUID.";
		expect(check("")).toEqual([{ type: "uuid", actual: "", message }]);
		expect(check("true")).toEqual([{ type: "uuid", actual: "true", message }]);
		expect(check("00000000-0000-0000-0000-000000000000")).toEqual([{ type: "uuid", actual: "00000000-0000-0000-0000-000000000000", message }]);
		expect(check("1234567-1234-1234-1234-1234567890ab")).toEqual([{ type: "uuid", actual: "1234567-1234-1234-1234-1234567890ab", message }]);
		expect(check("12345678-1234-1234-1234-1234567890ab")).toEqual(true);
	});

	it("check invalid version", () => {
		let check = v.compile({ $$root: true, type: "uuid" });
		let message = "The '' field must be a valid UUID.";

		expect(check("00000000-0000-7000-0000-000000000000")).toEqual([{ type: "uuid", actual: "00000000-0000-7000-0000-000000000000", message }]);
		expect(check("fdda765f-fc57-5604-c269-52a7df8164ec")).toEqual([{ type: "uuid", actual: "fdda765f-fc57-5604-c269-52a7df8164ec", message }]);

		const check1 = v.compile({ $$root: true, type: "uuid", version: 1 });
		const check2 = v.compile({ $$root: true, type: "uuid", version: 2 });
		const check3 = v.compile({ $$root: true, type: "uuid", version: 3 });
		const check4 = v.compile({ $$root: true, type: "uuid", version: 4 });
		const check5 = v.compile({ $$root: true, type: "uuid", version: 5 });
		message = "The '' field must be a valid UUID version provided.";

		expect(check1("9a7b330a-a736-51e5-af7f-feaf819cdc9f")).toEqual([{"actual": 5, "expected": 1, "type": "uuidVersion", message}]);
		expect(check1("9a7b330a-a736-51e5-af7f-feaf819cdc9f")).toEqual([{"actual": 5, "expected": 1, "type": "uuidVersion", message}]);
		expect(check2("9a7b330a-a736-41e5-af7f-feaf819cdc9f")).toEqual([{"actual": 4, "expected": 2, "type": "uuidVersion", message}]);
		expect(check3("9a7b330a-a736-41e5-af7f-feaf819cdc9f")).toEqual([{"actual": 4, "expected": 3, "type": "uuidVersion", message}]);
		expect(check4("9a7b330a-a736-21e5-af7f-feaf819cdc9f")).toEqual([{"actual": 2, "expected": 4, "type": "uuidVersion", message}]);
		expect(check5("9a7b330a-a736-11e5-af7f-feaf819cdc9f")).toEqual([{"actual": 1, "expected": 5, "type": "uuidVersion", message}]);
	});

	it("check valid version", () => {
		const check1 = v.compile({ $$root: true, type: "uuid", version: 1 });
		const check2 = v.compile({ $$root: true, type: "uuid", version: 2 });
		const check3 = v.compile({ $$root: true, type: "uuid", version: 3 });
		const check4 = v.compile({ $$root: true, type: "uuid", version: 4 });
		const check5 = v.compile({ $$root: true, type: "uuid", version: 5 });

		expect(check1("45745c60-7b1a-11e8-9c9c-2d42b21b1a3e")).toEqual(true);
		expect(check2("9a7b330a-a736-21e5-af7f-feaf819cdc9f")).toEqual(true);
		expect(check3("9125a8dc-52ee-365b-a5aa-81b0b3681cf6")).toEqual(true);
		expect(check4("10ba038e-48da-487b-96e8-8d3b99b6d18a")).toEqual(true);
		expect(check5("fdda765f-fc57-5604-a269-52a7df8164ec")).toEqual(true);

	});
});
