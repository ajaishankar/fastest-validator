"use strict";

const Validator = require("../../lib/validator");
const v = new Validator();

describe("Test checkEmail", () => {

	it("should check values", () => {
		const check = v.compile({ $$root: true, type: "email" });
		const message = "The '' field must be a string.";

		expect(check(null)).toEqual([{ type: "string", actual: null, message }]);
		expect(check(undefined)).toEqual([{ type: "string", actual: undefined, message }]);
		expect(check(0)).toEqual([{ type: "string", actual: 0, message }]);
		expect(check(1)).toEqual([{ type: "string", actual: 1, message }]);
		expect(check("")).toEqual([{ type: "email", actual: "", message: "The '' field must be a valid e-mail." }]);
		expect(check("true")).toEqual([{ type: "email", actual: "true", message: "The '' field must be a valid e-mail." }]);
		expect(check([])).toEqual([{ type: "string", actual: [], message }]);
		expect(check({})).toEqual([{ type: "string", actual: {}, message }]);
		expect(check(false)).toEqual([{ type: "string", actual: false, message }]);
		expect(check(true)).toEqual([{ type: "string", actual: true, message }]);
	});

	it("should check values with quick pattern", () => {
		const check = v.compile({ $$root: true, type: "email" });
		const message = "The '' field must be a valid e-mail.";

		expect(check("abcdefg")).toEqual([{ type: "email", actual: "abcdefg", message }]);
		expect(check("1234")).toEqual([{ type: "email", actual: "1234", message }]);
		expect(check("abc@gmail")).toEqual([{ type: "email", actual: "abc@gmail", message }]);
		expect(check("@gmail.com")).toEqual([{ type: "email", actual: "@gmail.com", message }]);

		// Invalid but we are in quick mode
		expect(check("https://john@company.net")).toEqual(true);

		expect(check("john.doe@company.net")).toEqual(true);
		expect(check("james.123.45@mail.co.uk")).toEqual(true);
		expect(check("admin@nasa.space")).toEqual(true);
	});

	it("should check values", () => {
		const check = v.compile({ $$root: true, type: "email", mode: "precise" });
		const message = "The '' field must be a valid e-mail.";

		expect(check("abcdefg")).toEqual([{ type: "email", actual: "abcdefg", message }]);
		expect(check("1234")).toEqual([{ type: "email", actual: "1234", message }]);
		expect(check("abc@gmail")).toEqual([{ type: "email", actual: "abc@gmail", message }]);
		expect(check("@gmail.com")).toEqual([{ type: "email", actual: "@gmail.com", message }]);
		expect(check("https://john@company.net")).toEqual([{ type: "email", actual: "https://john@company.net", message }]);

		expect(check("john.doe@company.net")).toEqual(true);
		expect(check("james.123.45@mail.co.uk")).toEqual(true);
		expect(check("admin@nasa.space")).toEqual(true);
	});

});
