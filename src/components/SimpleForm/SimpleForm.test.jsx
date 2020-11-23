import { fireEvent, render, waitFor } from "@testing-library/react";
import SimpleForm from "./SimpleForm";
import { FIELD_LABELS, VALIDATION_ERRORS } from "../../constants";

describe("SimpleForm", () => {

	describe("First Name Field", () => {

		test("should exist", () => {
			const { getByLabelText } = render(<SimpleForm />);
			expect(
				getByLabelText(FIELD_LABELS.FIRST_NAME)
			).toBeInTheDocument();
		});

		test("should fail validation when provided a blank value", async () => {
			expect(
				await testFieldForError(
					FIELD_LABELS.FIRST_NAME,
					"",
					VALIDATION_ERRORS.FIRST_NAME_REQUIRED
				)
			).toEqual(true);
		});

		test("should pass validation when provided a valid value", async () => {
			expect(
				await testFieldForError(
					FIELD_LABELS.FIRST_NAME,
					"Johnny",
					VALIDATION_ERRORS.FIRST_NAME_REQUIRED
				)
			).toEqual(false);
		});

	});

	describe("Last Name Field", () => {

		test("should exist", () => {
			const { getByLabelText } = render(<SimpleForm />);
			expect(
				getByLabelText(FIELD_LABELS.LAST_NAME)
			).toBeInTheDocument();
		});

		test("should fail validation when provided a blank value", async () => {
			expect(
				await testFieldForError(
					FIELD_LABELS.LAST_NAME,
					"",
					VALIDATION_ERRORS.LAST_NAME_REQUIRED
				)
			).toEqual(true);
		});

		test("should pass validation when provided a valid value", async () => {
			expect(
				await testFieldForError(
					FIELD_LABELS.LAST_NAME,
					"Walker",
					VALIDATION_ERRORS.LAST_NAME_REQUIRED
				)
			).toEqual(false);
		});

	});

	describe("City Field", () => {

		test("should exist", () => {
			const { getByLabelText } = render(<SimpleForm />);
			expect(
				getByLabelText(FIELD_LABELS.CITY)
			).toBeInTheDocument();
		});

		test("should fail validation when provided a blank value", async () => {
			expect(
				await testFieldForError(
					FIELD_LABELS.CITY,
					"",
					VALIDATION_ERRORS.CITY_REQUIRED
				)
			).toEqual(true);
		});

		test("should pass validation when provided a valid value", async () => {
			expect(
				await testFieldForError(
					FIELD_LABELS.CITY,
					"Seattle",
					VALIDATION_ERRORS.CITY_REQUIRED
				)
			).toEqual(false);
		});

	});

	describe("Zip Code Field", () => {

		test("should exist", () => {
			const { getByLabelText } = render(<SimpleForm />);
			expect(
				getByLabelText(FIELD_LABELS.ZIP_CODE)
			).toBeInTheDocument();
		});

		test("should fail validation when provided a blank value", async () => {
			expect(
				await testFieldForError(
					FIELD_LABELS.ZIP_CODE,
					"",
					VALIDATION_ERRORS.ZIP_CODE_REQUIRED
				)
			).toEqual(true);
		});

		test("should fail validation when provided an invalid zip code", async () => {
			expect(
				await testFieldForError(
					FIELD_LABELS.ZIP_CODE,
					"12",
					VALIDATION_ERRORS.ZIP_CODE_INVALID
				)
			).toEqual(true);
		});

		test("should fail validation when provided a valid zip code that is not exactly '98107'", async () => {
			expect(
				await testFieldForError(
					FIELD_LABELS.ZIP_CODE,
					"98106",
					VALIDATION_ERRORS.ZIP_CODE_MISMATCH
				)
			).toEqual(true);
		});

		test("should pass validation when provided exactly '98107'", async () => {
			expect(
				await testFieldForError(
					FIELD_LABELS.ZIP_CODE,
					"98107",
					VALIDATION_ERRORS.ZIP_CODE_REQUIRED
				)
			).toEqual(false);
			expect(
				await testFieldForError(
					FIELD_LABELS.ZIP_CODE,
					"98107",
					VALIDATION_ERRORS.ZIP_CODE_INVALID
				)
			).toEqual(false);
			expect(
				await testFieldForError(
					FIELD_LABELS.ZIP_CODE,
					"98107",
					VALIDATION_ERRORS.ZIP_CODE_MISMATCH
				)
			).toEqual(false);
		});

	});

});

async function testFieldForError(fieldLabelText, inputValue, validationMessage) {
	const { getByLabelText, getByText } = render(<SimpleForm />);
	const input = getByLabelText(fieldLabelText);

	input.value = inputValue;
	fireEvent.blur(input);

	await waitFor(() => "");

	try {
		getByText(validationMessage, { exact: false });
		return true;
	} catch(e) {
		return false;
	}
}
